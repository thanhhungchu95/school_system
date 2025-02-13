import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCascadeContraintsForStudent1739414574524 implements MigrationInterface {
    name = 'UpdateCascadeContraintsForStudent1739414574524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE student_teacher_relation DROP FOREIGN KEY FK_f66fb757c787b22fdec93af0e0f;`);
        await queryRunner.query(`ALTER TABLE student_teacher_relation ADD CONSTRAINT FK_f66fb757c787b22fdec93af0e0f FOREIGN KEY (student_id) REFERENCES students(id) ON UPDATE CASCADE ON DELETE CASCADE;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE student_teacher_relation DROP FOREIGN KEY FK_f66fb757c787b22fdec93af0e0f;`);
        await queryRunner.query(`ALTER TABLE student_teacher_relation ADD CONSTRAINT FK_f66fb757c787b22fdec93af0e0f FOREIGN KEY (student_id) REFERENCES students(id);`);
    }
}
