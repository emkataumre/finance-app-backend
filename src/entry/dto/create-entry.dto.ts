import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Category } from '../../category/entities/category.entity';

export class CreateEntryDto {
  @IsNotEmpty()
  amount: number;

  // @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  comment: string;

  category: Category;

  constructor(
    amount: number,
    date: Date,
    currency: string,
    name: string,
    comment: string,
    category: Category,
  ) {
    this.amount = amount;
    this.date = date;
    this.currency = currency;
    this.name = name;
    this.comment = comment;
    this.category = category;
  }
}
