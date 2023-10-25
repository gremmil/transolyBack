import { Injectable } from '@nestjs/common';
import { CreateCompanyDto, CreateDistrictDto, CreateEventDto, CreateMasterDto, CreateProvinceDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { District } from './entities/district.entity';
import { Province } from './entities/province.entity';
import { Event } from './entities/event.entity';

@Injectable()
export class MastersService {

  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(District)
    private readonly districtRepository: Repository<District>,
    @InjectRepository(Province)
    private readonly provinceRepository: Repository<Province>,
  ) { }

  create(createMasterDto: CreateMasterDto) {
    return 'This action adds a new master';
  }
  async createCompany(dto: CreateCompanyDto) {
    const item = this.companyRepository.create({
      description: dto.description
    });
    return await this.companyRepository.save(item);
  }
  async createEvent(dto: CreateEventDto) {
    const item = this.eventRepository.create({
      description: dto.description
    });
    return await this.eventRepository.save(item);
  }
  async createDistrict(dto: CreateDistrictDto) {
    const item = this.districtRepository.create({
      description: dto.description
    });
    return await this.districtRepository.save(item);
  }
  async createProvince(dto: CreateProvinceDto) {
    const item = this.provinceRepository.create({
      description: dto.description
    });
    return await this.provinceRepository.save(item);
  }

  findAll() {
    return `This action returns all masters`;
  }
  async findAllCompanies() {
    return await this.companyRepository.find({});
  }
  async findAllEvents() {
    return await this.eventRepository.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} master`;
  }

  update(id: number, updateMasterDto: UpdateMasterDto) {
    return `This action updates a #${id} master`;
  }

  remove(id: number) {
    return `This action removes a #${id} master`;
  }

  async deleteAllMasters() {
    const queryCompany = this.companyRepository.createQueryBuilder('company');
    const queryEvent = this.eventRepository.createQueryBuilder('event');
    const queryDistrict = this.districtRepository.createQueryBuilder('district');
    const queryProvince = this.provinceRepository.createQueryBuilder('province');

    try {
      await queryCompany.delete().where({}).execute();
      await queryEvent.delete().where({}).execute();
      await queryDistrict.delete().where({}).execute();
      await queryProvince.delete().where({}).execute();

      return;
    } catch (error) {
      console.error('Error al eliminar los registros:', error);
      throw new Error('Error al eliminar los registros');
    }

  }

}
