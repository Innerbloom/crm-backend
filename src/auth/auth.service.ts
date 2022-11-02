import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from '../dto/auth.login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(authLoginDto: AuthLoginDto) {
    const { username, password } = authLoginDto;

    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    } else if (!(await user.validatePassword(password))) {
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
    }
    return user.save();
  }

  async login(authLoginDto: AuthLoginDto) {
    const user = await this.validateUser(authLoginDto);

    const payload = {
      id: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
