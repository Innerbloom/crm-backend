import { Body, Controller, Get, Logger, Post, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from '../dto/auth.login.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Controller('login')
export class AuthController {
  private logger = new Logger('AuthController');
  data = new Date();
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() authLoginDto: AuthLoginDto) {
    this.logger.verbose(`${this.data} User: ${authLoginDto.username}`);
    return this.authService.login(authLoginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async Sign() {
    const date = new Date();
    return 'Success' + date;
  }
}
