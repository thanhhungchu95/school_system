import { MigrationInterface, QueryRunner } from "typeorm";

export class InitializeTables1739413428374 implements MigrationInterface {
    name = 'InitializeTables1739413428374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`students\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`student_teacher_relation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`student_id\` int NULL, \`teacher_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`teachers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`student_teacher_relation\` ADD CONSTRAINT \`FK_f66fb757c787b22fdec93af0e0f\` FOREIGN KEY (\`student_id\`) REFERENCES \`students\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`student_teacher_relation\` ADD CONSTRAINT \`FK_f21780c847754f2bb2ca2b9fb82\` FOREIGN KEY (\`teacher_id\`) REFERENCES \`teachers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`student_teacher_relation\` DROP FOREIGN KEY \`FK_f21780c847754f2bb2ca2b9fb82\``);
        await queryRunner.query(`ALTER TABLE \`student_teacher_relation\` DROP FOREIGN KEY \`FK_f66fb757c787b22fdec93af0e0f\``);
        await queryRunner.query(`DROP TABLE \`teachers\``);
        await queryRunner.query(`DROP TABLE \`student_teacher_relation\``);
        await queryRunner.query(`DROP TABLE \`students\``);
    }

}
