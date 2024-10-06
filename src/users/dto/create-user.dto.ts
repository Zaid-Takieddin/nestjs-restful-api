import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['admin', 'intern'], {
    message: "role must be 'admin' or 'intern'",
  })
  role: 'admin' | 'intern';
}
