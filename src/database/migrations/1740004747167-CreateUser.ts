import { Column, MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class CreateUser1740004747167 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await  queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    new TableColumn({
                        name: "id",
                        type: "int",
                        isGenerated: true,
                        isPrimary: true,
                        generationStrategy: "increment"
                    }),
                    {
                        name: "name",
                        type: "varchar",
                        length: "255",
                        isNullable: false
                    },
                    {
                        name: "password",
                        type: "varchar",
                        length: "20",
                        isNullable: false
                    },
                    {
                        name: "profile",
                        type: "enum",
                        enum:  ['DRIVER', 'BRANCH', 'ADMIN'],
                        isNullable: false
                    }
                ]
            })
        )

        await queryRunner.createTable(new Table(
            {
                name: "driver",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isGenerated: true,
                        generationStrategy: "increment",
                        isPrimary: true
                    },
                    {
                        name: "document",
                        type: "varchar",
                        length: "20",
                        isNullable: false
                    },
                    {
                        name: "user_id",
                        type: "int"
                    }
                ]
            }
        ))

        await queryRunner.createForeignKey("driver", new TableForeignKey({
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }

}
