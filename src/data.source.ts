import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
export const dbConfig: TypeOrmModuleOptions = {
  // TypeORM PostgreSQL DB Drivers
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: +process.env.DB_PORT || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'Pulnaskrub35',
  // Database name
  database: process.env.DB_NAME || 'finance-manager',
  // Synchronize database schema with entities
  synchronize: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/src/migrations/*{.ts,.js}'],
};

const dataSource = new DataSource(dbConfig as DataSourceOptions);
export default dataSource;
