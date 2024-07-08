import { MigrationInterface, QueryRunner } from "typeorm";

export class DataInit1720412427195 implements MigrationInterface {
    name = 'DataInit1720412427195'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "languages" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_7397752718d1c9eb873722ec9b2" UNIQUE ("code"), CONSTRAINT "PK_b517f827ca496b29f4d549c631d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b517f827ca496b29f4d549c631" ON "languages" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_7397752718d1c9eb873722ec9b" ON "languages" ("code") `);
        await queryRunner.query(`CREATE TABLE "product_names" ("id" SERIAL NOT NULL, "language_id" integer NOT NULL, "product_id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_33c2b3a8b6b66ad65a3157c4a9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_33c2b3a8b6b66ad65a3157c4a9" ON "product_names" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_298da44b95a571b4e11b7321e7" ON "product_names" ("language_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_3c2e6113930fd258b86d886e32" ON "product_names" ("product_id") `);
        await queryRunner.query(`CREATE TABLE "product_descriptions" ("id" SERIAL NOT NULL, "language_id" integer NOT NULL, "product_id" integer NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_8448465bc4faa6348b235d9b087" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8448465bc4faa6348b235d9b08" ON "product_descriptions" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_2ecb6280e538782f94216cb2c7" ON "product_descriptions" ("language_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e80d4c1bec1bee06d8a400463d" ON "product_descriptions" ("product_id") `);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0806c755e0aca124e67c0cf6d7" ON "products" ("id") `);
        await queryRunner.query(`ALTER TABLE "product_names" ADD CONSTRAINT "FK_298da44b95a571b4e11b7321e7d" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_names" ADD CONSTRAINT "FK_3c2e6113930fd258b86d886e328" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_descriptions" ADD CONSTRAINT "FK_2ecb6280e538782f94216cb2c73" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_descriptions" ADD CONSTRAINT "FK_e80d4c1bec1bee06d8a400463da" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_descriptions" DROP CONSTRAINT "FK_e80d4c1bec1bee06d8a400463da"`);
        await queryRunner.query(`ALTER TABLE "product_descriptions" DROP CONSTRAINT "FK_2ecb6280e538782f94216cb2c73"`);
        await queryRunner.query(`ALTER TABLE "product_names" DROP CONSTRAINT "FK_3c2e6113930fd258b86d886e328"`);
        await queryRunner.query(`ALTER TABLE "product_names" DROP CONSTRAINT "FK_298da44b95a571b4e11b7321e7d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0806c755e0aca124e67c0cf6d7"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e80d4c1bec1bee06d8a400463d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2ecb6280e538782f94216cb2c7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8448465bc4faa6348b235d9b08"`);
        await queryRunner.query(`DROP TABLE "product_descriptions"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3c2e6113930fd258b86d886e32"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_298da44b95a571b4e11b7321e7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_33c2b3a8b6b66ad65a3157c4a9"`);
        await queryRunner.query(`DROP TABLE "product_names"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7397752718d1c9eb873722ec9b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b517f827ca496b29f4d549c631"`);
        await queryRunner.query(`DROP TABLE "languages"`);
    }

}
