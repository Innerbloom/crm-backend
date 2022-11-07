import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { LogsService } from '../logs/logs.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { LogsEntity } from '../entities/logs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LogsEntity])],
  controllers: [UsersController],
  providers: [UsersService, LogsService],
  exports: [UsersService],
})
export class UsersModule {}
