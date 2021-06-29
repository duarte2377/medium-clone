import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCommentEntity1624949912993 implements MigrationInterface {
    name = 'CreateCommentEntity1624949912993'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comment_entity" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "body" character varying NOT NULL DEFAULT '', "authorId" integer, "articleId" integer, CONSTRAINT "PK_5a439a16c76d63e046765cdb84f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comment_entity" ADD CONSTRAINT "FK_31f70669b3ae650b3335cc02417" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment_entity" ADD CONSTRAINT "FK_095b0e27d7a343c41d85a18def8" FOREIGN KEY ("articleId") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment_entity" DROP CONSTRAINT "FK_095b0e27d7a343c41d85a18def8"`);
        await queryRunner.query(`ALTER TABLE "comment_entity" DROP CONSTRAINT "FK_31f70669b3ae650b3335cc02417"`);
        await queryRunner.query(`DROP TABLE "comment_entity"`);
    }

}
