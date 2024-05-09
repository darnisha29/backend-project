import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumns1715249678480 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
            // Add the new columns
            await queryRunner.addColumn(
                'employee_data',
                new TableColumn({
                    name: 'firstName',
                    type: 'varchar',
                    isNullable: true,
                }),
            );
    
            await queryRunner.addColumn(
                'employee_data',
                new TableColumn({
                    name: 'lastName',
                    type: 'varchar',
                    isNullable: true,
                }),
            );
        }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
