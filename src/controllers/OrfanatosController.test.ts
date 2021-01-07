//import { ApiRouteEnum } from 'routes';
import request from 'supertest';
import { createConnection } from 'typeorm';
import { app } from '../server';

describe('Teste OrfanatosController', () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    //pode ser utilizado para limpar ou fechar conexões
  });

  it('Requisição /Orfanatos deve retornar o status 200!', async () => {
    const loResultado = await request(app).get('/Orfanatos');

    expect(loResultado.status).toBe(200);
    // expect(loResultado.body.data).toBe('Registros de Orfanatos');
  });

  it('Requisição /Orfanatos/:id deve retornar o status 200!', async () => {
    const loResultado = await request(app).get('/Orfanatos/1');

    expect(loResultado.status).toBe(200);
    // expect(loResultado.body.data).toBe('Registro de uma Orfanatos');
  });

  it('Requisição de criação de uma Orfanatos deve retornar o status 201 com os dados do orfanato criado!', async () => {
    //Se a API tiver controle de autenticação de usuário
    // const loOrfanatos = await request(app).post(ApiRouteEnum.AuthLogin).send({
    //   email: "Orfanatos@email.com",
    //   senha: "senha"
    // });
    // expect(loOrfanatos.status).toBe(200);

    const loResultado = await request(app).post('/Orfanatos')    
      // .set({ token: loOrfanatos.body.token })
      .send({
        nome: "Lar da Criança",
        latitude: -12.9694025,
        longitude: -38.490993,
        sobre: "Foi fundado em 1963 a partir do sonho da adolescente Dulce Maria Goulart de Freitas. Mais informações em: http://lardacriancasalvador.org.br",
        instrucoes: "Qualquer pessoa pode realizar visitas no Lar da Criança, desde que respeitados os dias e horários estabelecidos. Para agendar sua visita, entre em contato pelo telefone: (71) 3244-3795.",
        horario_atendimento: "Das 8h até as 18h",
        aberto_fim_semana: true
      });

    expect(loResultado.status).toBe(201);    
    expect(loResultado.body.nome).toBe('Lar da Criança');
  });
});