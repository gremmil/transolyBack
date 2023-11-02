import { ApiProperty } from "@nestjs/swagger";


export class CreateMasterDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  description: string;
}

export class CreateCompanyDto extends CreateMasterDto {
  @ApiProperty()
  container: string;
}
export class CreateDistrictDto extends CreateMasterDto { }
export class CreateEventDto extends CreateMasterDto {
  @ApiProperty()
  showInWeb?: boolean;
}
export class CreateProvinceDto extends CreateMasterDto { }