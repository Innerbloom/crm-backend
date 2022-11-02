import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(30)
  name: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(30)
  password: string;
}
