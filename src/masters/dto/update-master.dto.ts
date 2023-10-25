import { PartialType } from '@nestjs/mapped-types';
import { CreateMasterDto } from './create-master.dto';

export class UpdateMasterDto extends PartialType(CreateMasterDto) { }

export class UpdateCompanyDto extends UpdateMasterDto { }
export class UpdateDistrictDto extends UpdateMasterDto { }
export class UpdateEventDto extends UpdateMasterDto { }
export class UpdateProvinceDto extends UpdateMasterDto { }