import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MastersService } from './masters.service';
import { CreateCompanyDto, CreateDistrictDto, CreateEventDto, CreateMasterDto, CreateProvinceDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';

@Controller('masters')
export class MastersController {
  constructor(private readonly mastersService: MastersService) { }

  @Post()
  create(@Body() createMasterDto: CreateMasterDto) {
    return this.mastersService.create(createMasterDto);
  }
  @Post()
  createCompany(@Body() createMasterDto: CreateCompanyDto) {
    return this.mastersService.create(createMasterDto);
  }
  @Post()
  createEvent(@Body() createMasterDto: CreateEventDto) {
    return this.mastersService.create(createMasterDto);
  }
  @Post()
  createProvince(@Body() createMasterDto: CreateProvinceDto) {
    return this.mastersService.create(createMasterDto);
  }
  @Post()
  createDistrict(@Body() createMasterDto: CreateDistrictDto) {
    return this.mastersService.create(createMasterDto);
  }
  @Get()
  findAll() {
    return this.mastersService.findAll();
  }
  @Get('/listEvents')
  findAllEvents() {
    return this.mastersService.findAllEvents();
  }
  @Get('/listCompanies')
  findAllCompanies() {
    return this.mastersService.findAllCompanies();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mastersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMasterDto: UpdateMasterDto) {
    return this.mastersService.update(+id, updateMasterDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mastersService.remove(+id);
  }
}
