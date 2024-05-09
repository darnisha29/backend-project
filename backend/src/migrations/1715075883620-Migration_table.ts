import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class MigrationTable1715075883620 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "product",
              columns: [
                {
                  name: "id",
                  type: "int",
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: "increment",
                },
                {
                  name: "name",
                  type: "varchar",
                  length: "255",
                },
                {
                  name: "price",
                  type: "decimal",
                  precision: 10,
                  scale: 2,
                },
                {
                  name: "description",
                  type: "text",
                  isNullable: true,
                },
              ],
            }),
            true 
          );
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("product", true, true, true);
    }

}
