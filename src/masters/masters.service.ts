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
  ) {
  }

  create(createMasterDto: CreateMasterDto) {
    return 'This action adds a new master';
  }
  async createCompany(dto: CreateCompanyDto) {
    try {
      const itemCreated = this.companyRepository.create({
        id: dto.id,
        description: dto.description,
        container: dto.container
      });
      const itemSaved = await this.companyRepository.save(itemCreated);
      return itemSaved;
    } catch (error) {
      throw error;
    }
  }
  async createEvent(dto: CreateEventDto) {
    try {
      const itemCreated = this.eventRepository.create({
        id: dto.id,
        description: dto.description,
        showInWeb: dto.showInWeb
      });
      const itemSaved = await this.eventRepository.save(itemCreated);
      return itemSaved;
    } catch (error) {
      throw error;
    }
  }
  async createDistrict(dto: CreateDistrictDto) {
    try {
      const item = this.districtRepository.create({
        id: dto.id,
        description: dto.description
      });
      return await this.districtRepository.save(item);
    } catch (error) {
      throw error;
    }
  }
  async createProvince(dto: CreateProvinceDto) {
    try {
      const item = this.provinceRepository.create({
        id: dto.id,
        description: dto.description
      });
      return await this.provinceRepository.save(item);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all masters`;
  }
  async findAllCompanies() {
    try {
      const list = await this.companyRepository.find({ select: { id: true, description: true } },);
      return list.map(({ id, description }) => ({ id, description }))
    } catch (error) {
      throw error;
    }
  }
  async findAllEvents() {
    try {
      const list = await this.eventRepository.find({});
      return list.reduce((acc, { id, description, showInWeb }) => {
        if (showInWeb) {
          acc.push({ id, description });
        }
        return acc;
      }, []);
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return ``;
  }
  async findOneCompany(id: number) {
    try {
      return await this.companyRepository.findOneBy({ id });
    } catch (error) {
      throw error;
    }
  }
  async findOneEvent(id: number) {
    try {
      return await this.eventRepository.findOneBy({ id });
    } catch (error) {
      throw error
    }
  }

  update(id: number, updateMasterDto: UpdateMasterDto) {
    return `This action updates a #${id} master`;
  }

  remove(id: number) {
    return `This action removes a #${id} master`;
  }
}
