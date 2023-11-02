import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, HttpExceptionBody } from '@nestjs/common';
import { EntityNotFoundError, QueryFailedError, TypeORMError } from 'typeorm';

@Catch(QueryFailedError, EntityNotFoundError, TypeORMError)
export class PostgresExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const { message, error, statusCode } = this.formatErrorResponse(exception);

    response.status(status).json({
      statusCode,
      message,
      error,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }


  private formatErrorResponse(exception: any) {
    let errorResponse: HttpExceptionBody = {
      message: [],
      error: 'Internal Server Error',
      statusCode: 500
    };
    if (exception.code === '23505') {
      errorResponse = {
        message: exception.detail,
        statusCode: HttpStatus.CONFLICT,
        error: 'Conflict'
      }
    }
    if (exception.code === '23502') {
      errorResponse = {
        message: exception.message,
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Bad Request'
      }
    }
    if (exception.code === '23503') {
      errorResponse = {
        message: exception.message,
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Bad Request'
      }
    }
    if (exception.code === '22P02') {
      errorResponse = {
        message: exception.message,
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Bad Request'
      }
    }
    return errorResponse;
  }
}
