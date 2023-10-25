import { ApiProperty } from '@nestjs/swagger';

export class CreateConsultantAddressDto {

  @ApiProperty()
  latitude: string;

  @ApiProperty()
  longitude: string;

  @ApiProperty()
  descripcion: string;

  @ApiProperty({ type: String })
  districtId: string;

  @ApiProperty({ type: String })
  province: string;
}

export class CreateConsultantDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty({ type: CreateConsultantAddressDto })
  consultantAddress: CreateConsultantAddressDto;
}




