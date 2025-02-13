import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCascadeContraintsForTeacher1739415012391 implements MigrationInterface {
    name = 'UpdateCascadeContraintsForTeacher1739415012391'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE student_teacher_relation DROP FOREIGN KEY FK_f21780c847754f2bb2ca2b9fb82;`);
        await queryRunner.query(`ALTER TABLE student_teacher_relation ADD CONSTRAINT FK_f21780c847754f2bb2ca2b9fb82 FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE student_teacher_relation DROP FOREIGN KEY FK_f21780c847754f2bb2ca2b9fb82;`);
        await queryRunner.query(`ALTER TABLE student_teacher_relation ADD CONSTRAINT FK_f21780c847754f2bb2ca2b9fb82 FOREIGN KEY (teacher_id) REFERENCES teachers(id);`);
    }
}
