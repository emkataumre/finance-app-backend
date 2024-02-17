import { Injectable } from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Entry } from './entities/entry.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EntryService {
  //Connection between repositroy and service
  constructor(
    @InjectRepository(Entry)
    private entryRepositroy: Repository<Entry>,
  ) {}

  create(createEntryDto: CreateEntryDto) {
    return this.entryRepositroy.save(createEntryDto);
  }

  findAll(): Promise<Entry[]> {
    return this.entryRepositroy.find({});
  }

  findOne(id: number) {
    return this.entryRepositroy.findOneBy({ id });
  }

  update(id: number, updateEntryDto: UpdateEntryDto) {
    return this.entryRepositroy.update(id, updateEntryDto);
  }

  remove(id: number) {
    return this.entryRepositroy.delete({ id });
  }

  removeAll() {
    return this.entryRepositroy.delete({});
  }
}
