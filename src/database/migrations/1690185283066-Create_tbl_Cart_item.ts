import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblCartItem1690185283066 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE cart_items (
          id serial PRIMARY KEY,
          user_id INT NOT NULL,
          cart_info json NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE cart_items`);
  }
}
