import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCompanyIDNullable1715309851592 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE product_data ALTER COLUMN company_id INT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
