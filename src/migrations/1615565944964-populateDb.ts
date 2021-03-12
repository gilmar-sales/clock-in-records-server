import { MigrationInterface, QueryRunner } from 'typeorm';

export class populateDb1615565944964 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    INSERT INTO users (name, email, password, role)
    VALUES (
      'Administrador',
      'admin@register.control',
      '$2b$12$BxIIk9PdKJPzkCf.ounIIePASq.WVOqmuTFp6x7ZXZNLlWkoLbi0W',
      'administrator'
    )
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DELETE
    FROM users
    WHERE email = 'admin@register.control';
    `);
  }
}
