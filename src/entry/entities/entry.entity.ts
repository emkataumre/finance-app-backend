import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class Entry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  date: Date;

  @Column()
  currency: string;

  @Column()
  name: string;

  @Column()
  comment: string;

  @ManyToOne(() => Category, (category) => category.entries)
  category: Category;
}
