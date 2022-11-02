import { Body, Controller, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dto/create.user.dto';

@Controller('reg')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    //console.log(createUserDto); this creates object name and password
    return this.usersService.create(createUserDto);
  }

  @Post(':id')
  show(@Param('id') id: string) {
    return this.usersService.showById(+id);
  }
}
