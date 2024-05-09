import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddcreatedAtUpdatedAt1715252777338 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumns('employee_data', [
            new TableColumn({
                name: 'created_at',
                type: 'datetimeoffset',
                default: 'SYSDATETIMEOFFSET()',
                isNullable: false,
            }),
            new TableColumn({
                name: 'updated_at',
                type: 'datetimeoffset',
                default: 'SYSDATETIMEOFFSET()',
                isNullable: false,
            }),
        ]);
        await queryRunner.addColumns('company_data', [
            new TableColumn({
                name: 'created_at',
                type: 'datetimeoffset',
                default: 'SYSDATETIMEOFFSET()',
                isNullable: false,
            }),
            new TableColumn({
                name: 'updated_at',
                type: 'datetimeoffset',
                default: 'SYSDATETIMEOFFSET()',
                isNullable: false,
            }),
        ]);
        await queryRunner.addColumns('product_data', [
            new TableColumn({
                name: 'created_at',
                type: 'datetimeoffset',
                default: 'SYSDATETIMEOFFSET()',
                isNullable: false,
            }),
            new TableColumn({
                name: 'updated_at',
                type: 'datetimeoffset',
                default: 'SYSDATETIMEOFFSET()',
                isNullable: false,
            }),
        ]);


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
