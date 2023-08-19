import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblProducts1690176270269 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE products (
          id serial PRIMARY KEY,
          name VARCHAR ( 50 ) NOT NULL UNIQUE,
          image VARCHAR(255),
          price FLOAT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "products"`);
  }
}
