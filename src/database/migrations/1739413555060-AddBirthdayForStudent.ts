import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBirthdayForStudent1739413555060 implements MigrationInterface {
    name = 'AddBirthdayForStudent1739413555060'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`students\` ADD \`birthday\` date NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`students\` DROP COLUMN \`birthday\``);
    }

}
