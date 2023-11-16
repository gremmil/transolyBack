import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export function IsBase64Custom(validationOptions?: { maxSizeInBytes: number } & ValidationOptions) {
  return function (object: Object, propertyName: string) {
    @ValidatorConstraint({ name: 'isBase64Custom', async: false })
    class IsBase64Constraint implements ValidatorConstraintInterface {
      validate(value: string) {
        const base64Regex = /^[A-Za-z0-9+/=]+$/;
        if (!base64Regex.test(value)) {
          throw new BadRequestException('Invalid base64 format. The value must be a string.');
        } else {
          if (validationOptions) {
            const { maxSizeInBytes } = validationOptions;
            const decodedData = Buffer.from(value, 'base64');
            const imageSizeInBytes = decodedData.length;
            if (imageSizeInBytes > maxSizeInBytes) {
              throw new BadRequestException(`Base64 image size exceeded. Maximum size allowed: ${maxSizeInBytes} bytes.`);
            }
          }
          return true;
        }

      }
    }

    registerDecorator({
      name: 'isBase64',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsBase64Constraint,
    });
  };
}
