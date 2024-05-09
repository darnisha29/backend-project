import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTabel1715069957702 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        //employee table
        await queryRunner.createTable(new Table({
            name: 'employee_data',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    generationStrategy: 'increment',
                    isPrimary: true,
                    isGenerated: true,
                    isNullable: false
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'password',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'role',
                    type: 'varchar',
                    isNullable: false
                },
            ]
        }))

        //company table
        await queryRunner.createTable(new Table({
            name: 'company_data',
            columns: [
                {
                    name: 'company_id',
                    type: 'int',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true
                },
                {
                    name: 'company_name',
                    type: 'varchar',
                    isNullable: false
                },
            ]
        }));

        //product table
        queryRunner.createTable(new Table({
            name: 'product_data',
            columns: [{
                name: 'product_id',
                type: 'int',
                isPrimary: true,
                isNullable: false,
                isGenerated: true
            }, {
                name: 'product_name',
                type: 'varchar',
                isNullable: false
            },
            {
                name: 'product_category',
                type: 'varchar',
                isNullable: false
            },
            {
                name: 'product_price',
                type: 'varchar',
                isNullable: false
            },
            {
                name: 'company_id', // Foreign key column
                type: 'int',
                isNullable: false,
            },
            ],
            foreignKeys: [
                {
                    columnNames: ['company_id'],
                    referencedTableName: 'company_data',
                    referencedColumnNames: ['company_id'],
                    onDelete: 'CASCADE'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('product_data'); // Drop the 'product_data' table
        await queryRunner.dropTable('company_data'); // Drop the 'company_data' table
        await queryRunner.dropTable('employee_data');
    }

}
