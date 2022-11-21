import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from '../dto/auth.login.dto';
import { LogsService } from '../logs/logs.service';
import { enumEvent } from '../entities/logs.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private logsService: LogsService,
  ) {}

  async validateUser(authLoginDto: AuthLoginDto) {
    const { username, password } = authLoginDto;

    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    } else if (!(await user.validatePassword(password))) {
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
    }
    return user;
  }

  async login(authLoginDto: AuthLoginDto) {
    const user = await this.validateUser(authLoginDto);

    if (user) {
      const type = enumEvent.LOGIN;
      await this.logsService.create(user.username, type);
    }

    const payload = {
      id: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
