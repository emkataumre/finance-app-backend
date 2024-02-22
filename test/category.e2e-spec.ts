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
  });
});
