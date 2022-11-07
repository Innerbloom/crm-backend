import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create.user.dto';
import { User } from '../entities/user.entity';
import { enumEvent } from '../entities/logs.entity';
import { LogsService } from '../logs/logs.service';

@Injectable()
export class UsersService {
  constructor(private logsService: LogsService) {}
  async create(createUserDto: CreateUserDto) {
    const user = User.create(createUserDto);
    try {
      await user.save();
      delete user.password;

      const type = enumEvent.REGISTRATION;
      await this.logsService.create(user.username, type);

      return user;
    } catch {
      throw new HttpException('The user exists', HttpStatus.BAD_REQUEST);
    }
  }

  async showById(id: number): Promise<User> {
    const user = await this.findById(id);
    delete user.password;
    return user;
  }

  async findById(id: number) {
    return await User.findOne({
      where: {
        id: id,
      },
    });
  }

  async findByUsername(username: string) {
    return await User.findOne({
      where: {
        username: username,
      },
    });
  }
}
