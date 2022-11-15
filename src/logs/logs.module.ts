import { Module } from '@nestjs/common';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { LogsEntity } from '../entities/logs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LogsEntity])],
  controllers: [LogsController],
  providers: [LogsService],
  exports: [LogsService],

})
export class LogsModule {}
