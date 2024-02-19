import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCategory1708355211373 implements MigrationInterface {
    name = 'AddCategory1708355211373'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" ADD "categoryId" integer`);
        await queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_5e1c00d1bf0d7f449fbd257d3c8" FOREIGN KEY ("categoryId") REFERENCES "entry"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_5e1c00d1bf0d7f449fbd257d3c8"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "categoryId"`);
    }

}
