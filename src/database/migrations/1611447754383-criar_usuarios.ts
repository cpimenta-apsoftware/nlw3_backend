import { MigrationInterface, QueryRunner, Table } from "typeorm";
import Usuario from "../../models/Usuario";
import Criptografia from "../../utils/Criptografia";

export class criarUsuarios1611447754383 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'usuarios',
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
          name: 'email',
          type: 'varchar'
        },
        {
          name: 'senha',
          type: 'varchar'
        }       
      ]
    }));

    //usuario padrao
    const loUsuario = queryRunner.manager.create(Usuario);
    loUsuario.nome = 'padrao';
    loUsuario.email = 'padrao@apsoftware.com';
    loUsuario.senha = await new Criptografia('abretesesamo').obterValorCriptografado();    

    await queryRunner.manager.save(loUsuario);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {    
    await queryRunner.dropTable('usuarios');
  }

}
