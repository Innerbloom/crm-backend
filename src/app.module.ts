import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { User } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { LogsEntity } from './entities/logs.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [User, LogsEntity],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    TypeOrmModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
