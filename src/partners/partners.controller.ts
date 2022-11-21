import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { PartnersService } from './partners.service';
import { PartnersEntity } from '../entities/partners.entity';

@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Post()
  createPartners(@Body() partnersEntity: PartnersEntity) {
    return this.partnersService.createPartners(partnersEntity);
  }

  @Get()
  async findAll() {
    return await this.partnersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.partnersService.findById(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() partnersEntity: PartnersEntity,
  ) {
    return await this.partnersService.update(id, partnersEntity);
  }
}
