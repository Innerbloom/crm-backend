import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { enumPartners, PartnersEntity } from '../entities/partners.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PartnersService {
  constructor(
    @InjectRepository(PartnersEntity)
    private readonly partnersEntity: Repository<PartnersEntity>,
  ) {}

  async createPartners(partnersEntity: PartnersEntity) {
    const partners = PartnersEntity.create(partnersEntity);
    partners.partnersEvent = enumPartners.ACTIVATE;
    try {
      await partners.save();
      return partners;
    } catch (err) {
      throw new HttpException('Something wrong', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<PartnersEntity[]> {
    return await this.partnersEntity.find({
      order: {
        date: 'ASC',
      },
    });
  }

  async findById(id: number) {
    return await PartnersEntity.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, partnersEntity: PartnersEntity) {
    return await this.partnersEntity.update(id, partnersEntity);
  }

  async delete(id: number) {
    await this.partnersEntity.delete(id);
  }
}
