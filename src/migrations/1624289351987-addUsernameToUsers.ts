import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUsernameToUsers1624289351987 implements MigrationInterface {
  name = 'addUsernameToUsers1624289351987';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "username" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
  }
}
