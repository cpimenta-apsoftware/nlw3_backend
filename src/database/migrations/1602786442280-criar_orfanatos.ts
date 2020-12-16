import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class criarOrfanatos1602786442280 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // REALIZAR ALTERAÇÕES
    // CRIAR NTABELA, CRIAR CAMPO, DELETAR CAMPO
    await queryRunner.createTable(new Table({
      name: 'orfanatos',
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
          name: 'nome',
          type: 'varchar'
        },
        {
          name: 'latitude',
          type: 'float',
          scale: 10,
          precision: 2
        },
        {
          name: 'longitude',
          type: 'float',
          scale: 10,
          precision: 2
        },
        {
          name: 'sobre',
          type: 'text',
        },
        {
          name: 'instrucoes',
          type: 'text'
        },
        {
          name: 'horario_atendimento',
          type: 'varchar'
        },
        {
          name: 'aberto_fim_semana',
          type: 'boolean',
          default: false
        }      
      ]      
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // DESFAZER O QUE FOI FEITO NO UP
    await queryRunner.dropTable('orfanatos');
  }

}