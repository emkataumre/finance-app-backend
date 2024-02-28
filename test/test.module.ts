import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { CategoryModule } from '../src/category/category.module';
import { EntryModule } from '../src/entry/entry.module';
import { EntryService } from '../src/entry/entry.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EntryModule,
    CategoryModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: 'financemanagertestingdb',
        autoLoadEntities: true,
        synchronize: true, //DONT do that on production :) -> wipes your database
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class TestModule {}
