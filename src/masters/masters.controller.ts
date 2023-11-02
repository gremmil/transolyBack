import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MastersService } from './masters.service';
import { CreateCompanyDto, CreateDistrictDto, CreateEventDto, CreateMasterDto, CreateProvinceDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';
import { ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Masters')
@Controller('masters')
export class MastersController {
  constructor(private readonly mastersService: MastersService) { }


  @Post()
  @ApiOperation({ summary: 'Crear Maestro', })
  @ApiExcludeEndpoint()
  create(@Body() createMasterDto: CreateMasterDto) {
    return this.mastersService.create(createMasterDto);
  }

  @Post('company')
  @ApiOperation({ summary: 'Crear Empresa' })
  @ApiExcludeEndpoint()
  createCompany(@Body() createMasterDto: CreateCompanyDto) {
    return this.mastersService.create(createMasterDto);
  }

  @Post('event')
  @ApiOperation({ summary: 'Crear Evento' })
  @ApiExcludeEndpoint()
  createEvent(@Body() createMasterDto: CreateEventDto) {
    return this.mastersService.create(createMasterDto);
  }

  @Post('province')
  @ApiOperation({ summary: 'Crear Provincia' })
  @ApiExcludeEndpoint()
  createProvince(@Body() createMasterDto: CreateProvinceDto) {
    return this.mastersService.create(createMasterDto);
  }

  @Post('district')
  @ApiOperation({ summary: 'Crear Distrito' })
  @ApiExcludeEndpoint()
  createDistrict(@Body() createMasterDto: CreateDistrictDto) {
    return this.mastersService.create(createMasterDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener Todos los Maestros' })
  @ApiExcludeEndpoint()
  findAll() {
    return this.mastersService.findAll();
  }

  @Get('/listEvents')
  @ApiOperation({ summary: 'Obtener Todos los Eventos' })
  findAllEvents() {
    return this.mastersService.findAllEvents();
  }

  @Get('/listCompanies')
  @ApiOperation({ summary: 'Obtener Todos las Empresas' })
  findAllCompanies() {
    return this.mastersService.findAllCompanies();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un Maestro' })
  @ApiExcludeEndpoint()
  findOne(@Param('id') id: string) {
    return this.mastersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un Maestro' })
  @ApiExcludeEndpoint()
  update(@Param('id') id: string, @Body() updateMasterDto: UpdateMasterDto) {
    return this.mastersService.update(+id, updateMasterDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un Maestro' })
  @ApiExcludeEndpoint()
  remove(@Param('id') id: string) {
    return this.mastersService.remove(+id);
  }
}
