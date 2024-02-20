import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateEntryDto } from '../src/entry/dto/create-entry.dto';
import { EntryService } from '../src/entry/entry.service';
import { Repository } from 'typeorm';
import { Entry } from 'src/entry/entities/entry.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let entryService: EntryService;
  let entryRepository: Repository<Entry>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    entryService = moduleFixture.get<EntryService>(EntryService);
    await entryService.removeAll();

    await app.init();
  });

  afterEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    await entryRepository.query('DELETE FROM entry');
    await moduleFixture.close();
  });

  describe('/ (POST) entry controller', () => {
    it('should create a new entry when passed a valid entry)', async () => {
      const validEntry = new CreateEntryDto(
        100,
        new Date(),
        'DKK',
        'pizza',
        'i should not buy takeout',
      );
      const { body } = await request(app.getHttpServer())
        .post('/entry')
        .send(validEntry)
        .expect(201);

      expect(body.amount).toEqual(100);
      expect(body.id).toBeDefined();
    });

    it('should not create a new entry when passed an invalid entry)', async () => {
      const inValidEntry = new CreateEntryDto(
        100,
        new Date(),
        'DKK',
        '',
        'i should not buy takeout',
      );
      const { body } = await request(app.getHttpServer())
        .post('/entry')
        .send(inValidEntry)
        .expect(400);

      expect(body.id).not.toBeDefined();
      expect(body.message[0]).toEqual('name should not be empty');
    });
  });

  describe('/ (GET) entry controller', () => {
    it('should return all entries', async () => {
      const mockEntry1 = new CreateEntryDto(
        100,
        new Date(),
        'DKK',
        'pizza',
        'I should not buy takeout 1',
      );

      const mockEntry2 = new CreateEntryDto(
        200,
        new Date(),
        'USD',
        'burger',
        'I should not buy takeout 2',
      );

      await entryService.create(mockEntry1);
      await entryService.create(mockEntry2);

      const { body } = await request(app.getHttpServer())
        .get('/entry')
        .expect(200);

      expect(body[0].id).toBeDefined();
      expect(body[1].id).toBeDefined();

      expect(body[0].amount).toEqual(100);
      expect(body[1].amount).toEqual(200);

      return await request(app.getHttpServer()).get('/entry').expect(200);
    });

    it('should return one entry', async () => {
      const mockEntry1 = new CreateEntryDto(
        100,
        new Date(),
        'DKK',
        'pizza',
        'I should not buy takeout 1',
      );

      const createdEntry1 = await entryService.create(mockEntry1);

      const entry1Id = createdEntry1.id;

      const { body } = await request(app.getHttpServer())
        .get(`/entry/${entry1Id}`)
        .expect(200);

      expect(body.id).toBeDefined();
      expect(body.amount).toEqual(100);
    });
  });

  describe('/ (PUT) entry controller', () => {
    it('should update an entry', async () => {
      //ARRANGE
      const mockEntry = new CreateEntryDto(
        100,
        new Date(),
        'DKK',
        'pizza',
        'I should not buy takeout 1',
      );

      const createdEntry = await entryService.create(mockEntry);
      createdEntry.amount = 150;

      //ACT
      const { body } = await request(app.getHttpServer())
        .put(`/entry/${createdEntry.id}`)
        .send(createdEntry)
        //ASSERT
        .expect(200);

      expect(body.affected).toEqual(1);
    });
  });

  describe('/ (DELETE) entry controller', () => {
    it('should delete one entry', async () => {
      //ARRANGE
      const mockEntry = new CreateEntryDto(
        100,
        new Date(),
        'DKK',
        'pizza',
        'I should not buy takeout 1',
      );

      const mockEntry2 = new CreateEntryDto(
        200,
        new Date(),
        'USD',
        'burger',
        'I should not buy takeout 2',
      );

      const createdEntry = await entryService.create(mockEntry);
      const createdEntry2 = await entryService.create(mockEntry2);

      //ACT
      const { body } = await request(app.getHttpServer())
        .delete(`/entry/${createdEntry.id}`)
        //ASSERT
        .expect(200);

      console.log(body);

      expect(body.affected).toEqual(1);
      expect(createdEntry2.id).toBeDefined();
    });
  });
});
