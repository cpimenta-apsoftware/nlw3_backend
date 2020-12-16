// REQ / RES
import express from 'express';
import path from 'path';
import cors from 'cors';

import 'express-async-errors';

// import { getRepository } from 'typeorm';
// import Orfanato from './models/Orfanato';

import './database/connection';

import routes from './routes';
import errorHandler from './errors/handler';

const app = express();

app.use(cors(
  // Para produção incluir origin para limitar o acesso à API
//   {
//   origin:
// }
));
app.use(express.json());
// Rota: /users

// Recurso: users

// Método: http => GET  POST, PUT, DELETE
// GET -> PARA BUSCAR UMA INFORMAÇÃO
// POST =para criar uma infromação
// PUT -> para editar uma informação
// DELETE -> para deleter uma informação

// Parâmetro:
// Query Params: users?search=diego&page=2
// Route Params: users/1 (identificar um recurso)
// Body: 

// app.get('/users', (request, response) => {
//   // console.log('teste');
//   // return response.send('Olá mundo');
//   return response.json({ message: 'Olá mundo' });

// });

// app.post('/users', (request, response) => {
//   console.log(request.query);    
//   console.log(request.body);
//   return response.json({ message: 'Olá mundo' });
// });

// app.post('/users/:id', (request, response) => {  
//   console.log(request.params);  
//   return response.json({ message: 'Olá mundo' });
// });


// app.post('/orfanatos', async (requisicao, resposta) => {
//   const {
//     nome,
//     latitude,
//     longitude,
//     sobre,
//     instrucoes,
//     horario_atendimento,
//     aberto_fim_semana
//   } = requisicao.body;

//   const orfanatosRepository = getRepository(Orfanato);

//   const orfanato = orfanatosRepository.create({
//     nome,
//     latitude,
//     longitude,
//     sobre,
//     instrucoes,
//     horario_atendimento,
//     aberto_fim_semana
//   })

//   await orfanatosRepository.save(orfanato);

//   return resposta.status(201).json(orfanato);
// });

app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(errorHandler);

app.listen(3333);

