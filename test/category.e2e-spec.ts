import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { CategoryService } from '../src/category/category.service';
import { EntryService } from '../src/entry/entry.service';
import { CreateCategoryDto } from '../src/category/dto/create-category.dto';
import { TestModule } from './test.module';

describe('CategoryController (e2e)', () => {
  let app: INestApplication;
  let entryService: EntryService;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    entryService = moduleFixture.get<EntryService>(EntryService);
    categoryService = moduleFixture.get<CategoryService>(CategoryService);
    await categoryService.removeAll();

    await app.init();
  });

  describe('/ (POST) category controller', () => {
    it('should create a new category when passed a valid category', async () => {
      const mockCategory = new CreateCategoryDto('Entertainment');
      const { body } = await request(app.getHttpServer())
        .post('/category')
        .send(mockCategory)
        .expect(201);

      expect(body.name).toEqual('Entertainment');
      expect(body.id).toBeDefined();
    });

    it('should not create a new category when passed an invalid category', async () => {
      const invalidMockCategory = new CreateCategoryDto('');
      const { body } = await request(app.getHttpServer())
        .post('/category')
        .send(invalidMockCategory)
        .expect(400);

      expect(body.id).not.toBeDefined();
      expect(body.message[0]).toEqual('name should not be empty');
    });
  });

  describe('/ (GET) category controller', () => {
    it('should return all category', async () => {
      const mockCategory1 = new CreateCategoryDto('Food');
      const mockCategory2 = new CreateCategoryDto('Entertainment');
      await categoryService.create(mockCategory1);
      await categoryService.create(mockCategory2);

      const { body } = await request(app.getHttpServer())
        .get('/category')
        .expect(200);

      expect(body[0].id).toBeDefined();
      expect(body[1].id).toBeDefined();

      expect(body[0].name).toEqual('Food');
      expect(body[1].name).toEqual('Entertainment');
    });

    it('should return one category', async () => {
      const mockCategory1 = new CreateCategoryDto('Food');
      const mockCategory2 = new CreateCategoryDto('Entertainment');

      const createdCategory1 = await categoryService.create(mockCategory1);
      const createdCategory2 = await categoryService.create(mockCategory2);

      const id = createdCategory1.id;

      const { body } = await request(app.getHttpServer())
        .get(`/category/${id}`)
        .expect(200);

      expect(body.id).toBeDefined();
    });
  });

  describe('/ (PUT) category controller', () => {
    it('should update an entry', async () => {
      const mockCategory = new CreateCategoryDto('Food');

      const createdCategory = await categoryService.create(mockCategory);
      createdCategory.name = 'Entertainment';

      const id = createdCategory.id;
      const { body } = await request(app.getHttpServer())
        .put(`/category/${id}`)
        .send(createdCategory)
        //ASSERT
        .expect(200);

      console.log(body);

      expect(body.affected).toEqual(1);
      expect(body.name).toEqual('Entertainment');
    });
  });

  describe('/ (DELETE) category controller', () => {
    it('should delete one category', async () => {
      const mockCategory1 = new CreateCategoryDto('Food');
      const mockCategory2 = new CreateCategoryDto('Entertainment');

      const createdCategory1 = await categoryService.create(mockCategory1);
      const createdCategory2 = await categoryService.create(mockCategory2);

      const { body } = await request(app.getHttpServer())
        .delete(`/entry/${createdCategory1.id}`)
        //ASSERT
        .expect(200);

      console.log('delet', body);

      expect(createdCategory1.id).not.toBeDefined();
      expect(createdCategory2.id).toBeDefined();
    });
  });
});
