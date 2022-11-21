import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { enumEvent, LogsEntity } from '../entities/logs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(LogsEntity)
    private readonly logsEntity: Repository<LogsEntity>,
  ) {}

  async create(user: string, event: enumEvent) {
    const log = LogsEntity.create();
    log.username = user;
    log.event = event;
    try {
      await log.save();
      return log;
    } catch {
      throw new HttpException('Something wrong', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    return await this.logsEntity.find({
      order: {
        date: 'ASC',
      },
    });
  }
}
