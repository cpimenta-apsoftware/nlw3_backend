//import { ApiRouteEnum } from 'routes';
import request from 'supertest';
import { createConnection, getConnection } from 'typeorm';
import { app } from '../server';

describe('Teste UsuariosController', () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    await getConnection().close();
  });

  it('Requisição /usuarios deve retornar o status 200!', async () => {
    const loResultado = await request(app).get('/usuarios');

    expect(loResultado.status).toBe(200);
    // expect(loResultado.body.data).toBe('Registros de Usuarios');
  });

  it('Requisição /usuarios/:id deve retornar o status 200!', async () => {
    const loResultado = await request(app).get('/usuarios/1');

    expect(loResultado.status).toBe(200);
    // expect(loResultado.body.data).toBe('Registro de uma Usuarios');
  });

  it('Requisição de criação de usuario deve retornar o status 400 por senha invalida!', async () => {
    const loResultado = await request(app).post('/usuarios')          
      .send({
        nome: "padrao",
        email: "padrao@apsoftware.com",
        senha: "a"        
      });

    expect(loResultado.status).toBe(400);       
    expect(loResultado.body.erros.senha[0]).toBe('senha must be at least 4 characters');
  });

  it('Requisição de criação de usuario deve retornar o status 201 com os dados do Usuario criado!', async () => {
    //Se a API tiver controle de autenticação de usuário
    // const loUsuarios = await request(app).post(ApiRouteEnum.AuthLogin).send({
    //   email: "Usuarios@email.com",
    //   senha: "senha"
    // });
    // expect(loUsuarios.status).toBe(200);

    const loResultado = await request(app).post('/usuarios')    
      // .set({ token: loUsuarios.body.token })
      .send({
        nome: "padrao",
        email: "padrao@apsoftware.com",
        senha: "abretesesamo"        
      });

    expect(loResultado.status).toBe(201);    
    expect(loResultado.body.nome).toBe('padrao');
  });
});