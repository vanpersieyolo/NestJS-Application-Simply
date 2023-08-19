import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTblOrders1690184965779 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE orders (
            id serial PRIMARY KEY,
            email VARCHAR ( 50 ) NOT NULL,
            address VARCHAR(200),
            total_amount FLOAT DEFAULT 0,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE orders`);
  }
}
