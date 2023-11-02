import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, BadRequestException, HttpExceptionBody, NotFoundException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ValidationError } from 'class-validator';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const { message, error, statusCode } = this.formatErrorResponse(exception);

    response.status(status).json({
      statusCode,
      message,
      error,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private formatErrorResponse(exception: HttpException) {
    let errorResponse: HttpExceptionBody = {
      message: [],
      error: 'Internal Server Error',
      statusCode: 500
    };

    if (exception instanceof HttpException && exception.getResponse() instanceof Array) {
      const validationErrors = exception.getResponse() as ValidationError[];
      errorResponse.message = this.formatValidationErrors(validationErrors);
    }
    if (exception instanceof BadRequestException) {
      const { message, error, statusCode } = exception.getResponse() as HttpExceptionBody;
      errorResponse = { message, error, statusCode };
    }

    if (exception instanceof NotFoundException) {
      const { message, error, statusCode } = exception.getResponse() as HttpExceptionBody;
      errorResponse = { message, error, statusCode };
    }

    return errorResponse;
  }

  private formatValidationErrors(validationErrors: ValidationError[]) {
    const errors = [];

    for (const validationError of validationErrors) {
      for (const property in validationError.constraints) {
        if (validationError.constraints.hasOwnProperty(property)) {
          errors.push({
            field: property,
            message: validationError.constraints[property],
          });
        }
      }
    }

    return errors;
  }
}
