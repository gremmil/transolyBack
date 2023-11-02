import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }
  async create(dto: CreateUserDto) {
    try {
      const item = this.userRepository.create({
        userName: dto.userName,
        password: dto.password
      });
      return await this.userRepository.save(item);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return (await this.userRepository.find({})).map(e => ({ id: e.id, userName: e.userName }));
  }

  async findOne(id: string) {
    try {
      let user: User;
      if (id) {
        user = await this.userRepository.findOneBy({ id });
      }
      if (!user)
        throw new NotFoundException(`User with ${id} not found`);
      return user;
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  deleteAllUser
}
