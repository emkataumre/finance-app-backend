import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
