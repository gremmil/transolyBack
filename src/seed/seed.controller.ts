import { Controller, Post } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) { }

  @ApiOperation({ summary: 'Crear Data Inicial' })
  @Post()
  executeSeed() {
    return this.seedService.executeSeed();
  }

}
