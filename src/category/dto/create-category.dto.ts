import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
