import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1624104607849 implements MigrationInterface {
  name = 'SeedDb1624104607849';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tags(name) VALUES ('react'), ('vanilla'), ('angular')`,
    );

    await queryRunner.query(
      // password is 123
      `INSERT INTO users (username, email, password) VALUES ('duarte', 'duarte@gmail.com', '$2b$10$sb6FXe8PuK8w6uioXxVgBe5UG1lJj2dGjf4PzWDlGEvhdCss7SVJ2')`,
    );

    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('first-article', 'First article', 'First article description', 'First article body', 'coffee,dragons', 1), ('second-article', 'Second article', 'Second article description', 'Second article body', 'coffee,dragons', 1)`,
    );
  }

  public async down() {}
}
