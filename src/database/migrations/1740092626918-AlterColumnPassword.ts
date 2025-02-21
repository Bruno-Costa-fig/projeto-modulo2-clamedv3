import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterColumnPassword1740092626918 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn("users" , 
            new TableColumn({
                name: "password",
                type: "varchar",
                length: "20",
                isNullable: false
            }),
            new TableColumn({
                name: "password",
                type: "varchar",
                length: "150",
                isNullable: false
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn("users" , 
            new TableColumn({
                name: "password",
                type: "varchar",
                length: "150",
                isNullable: false
            }),
            new TableColumn({
                name: "password",
                type: "varchar",
                length: "20",
                isNullable: false
            })
        )
    }

}
