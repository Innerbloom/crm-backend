import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt_strategy';
import { LogsService } from '../logs/logs.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { LogsEntity } from '../entities/logs.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LogsEntity]),
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '24h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LogsService],
})
export class AuthModule {}
