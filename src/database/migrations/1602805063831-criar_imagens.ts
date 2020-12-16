import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class criarImagens1602805063831 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(new Table({
      name: 'imagens',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'diretorio',
          type: 'varchar'
        },
        {
          name: 'id_orfanato',
          type: 'integer'
        }
      ],
      foreignKeys: [
        {
          name: 'ImagemOrfanato',
          columnNames: ['id_orfanato'],
          referencedTableName: 'orfanatos',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      ]
    }));
  }  

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('imagens');
  }
}
