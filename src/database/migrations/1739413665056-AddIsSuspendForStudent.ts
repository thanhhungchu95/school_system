import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsSuspendForStudent1739413665056 implements MigrationInterface {
    name = 'AddIsSuspendForStudent1739413665056'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`students\` ADD \`isSuspend\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`students\` DROP COLUMN \`isSuspend\``);
    }
}
