import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrfanatosController from './controllers/OrfanatosController';

// import { getRepository } from 'typeorm';
// import Orfanato from './models/Orfanato';

const routes = Router();
const upload = multer(uploadConfig);

//MVC
// mODEL: representação de uma tabela no banco
// View: como as coisas são exibidas no fronend
// Controller: logica das rotas, regras de negocio

//padrão de métodos do controller: index, show, create, update, delete

// routes.post('/orfanatos', async (requisicao, resposta) => {
  // const {
  //   nome,
  //   latitude,
  //   longitude,
  //   sobre,
  //   instrucoes,
  //   horario_atendimento,
  //   aberto_fim_semana
  // } = requisicao.body;

  // const orfanatosRepository = getRepository(Orfanato);

  // const orfanato = orfanatosRepository.create({
  //   nome,
  //   latitude,
  //   longitude,
  //   sobre,
  //   instrucoes,
  //   horario_atendimento,
  //   aberto_fim_semana
  // })

  // await orfanatosRepository.save(orfanato);

  // return resposta.status(201).json(orfanato);


  // return OrfanatosController.create(requisicao, resposta);
// });

routes.post('/orfanatos', upload.array('imagens'), OrfanatosController.create);
routes.get('/orfanatos', OrfanatosController.index);
routes.get('/orfanatos/:id', OrfanatosController.show);

export default routes;