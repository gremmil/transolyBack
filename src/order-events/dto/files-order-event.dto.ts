import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'validateImage', async: false })
class ValidateImageConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const maxSize = 10 * 1024 * 1024;
    const allowedExtensions = /\.(JPG|JPEG|PNG|jpg|jpeg|png)$/;

    if (!value || value.length === 0) {
      return false;
    }

    for (const file of value) {
      if (!file.originalname.match(allowedExtensions)) {
        args.constraints[0] = 'Only files with extensions: JPG, JPEG, PNG, jpg, jpeg, png are allowed';
        return false;
      }

      if (file.size > maxSize) {
        args.constraints[0] = 'The file size exceeds the maximum allowed: 10MB';
        return false;
      }
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return args.constraints[0];
  }
}

export function ValidateImage() {
  return function (object: any, propertyName: string) {
    Validate(ValidateImageConstraint, {
      message: 'Invalid file(s) provided',
    })(object, propertyName);
  };
}


export class FilesOrderEventDto {


  mainImageUrl: Express.Multer.File[];
  referenceImageUrl: Express.Multer.File[];
}
