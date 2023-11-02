import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

  @ApiProperty({ type: String })
  userName: string;

  @ApiProperty({ type: String })
  password: string;
}

