import { Entry } from 'src/entry/entities/entry.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Entry, (entry) => entry.category)
  entries: Entry[];
}
