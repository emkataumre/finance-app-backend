import { Entry } from 'src/entry/entities/entry.entity';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Entry, (entry) => entry.category)
  entries: Entry[];
}
