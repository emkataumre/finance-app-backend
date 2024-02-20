import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedTables1708440089660 implements MigrationInterface {
    name = 'CreatedTables1708440089660'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "entry" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "date" TIMESTAMP NOT NULL, "currency" character varying NOT NULL, "name" character varying NOT NULL, "comment" character varying NOT NULL, "categoryId" integer, CONSTRAINT "PK_a58c675c4c129a8e0f63d3676d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_5e1c00d1bf0d7f449fbd257d3c8" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_5e1c00d1bf0d7f449fbd257d3c8"`);
        await queryRunner.query(`DROP TABLE "entry"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
