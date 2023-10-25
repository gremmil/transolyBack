import { ApiProperty } from "@nestjs/swagger";

export class CreateMasterDto {
  @ApiProperty({ example: 'District description' })
  description: string;
}

export class CreateCompanyDto extends CreateMasterDto { }
export class CreateDistrictDto extends CreateMasterDto { }
export class CreateEventDto extends CreateMasterDto { }
export class CreateProvinceDto extends CreateMasterDto { }