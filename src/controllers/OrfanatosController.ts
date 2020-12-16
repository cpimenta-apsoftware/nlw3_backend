import {Request, Response} from 'express';
import { getRepository } from 'typeorm';
import Orfanato from '../models/Orfanato';
import orfanatoView from '../views/orfanatos_view'
import * as Yup from 'yup';

export default {
  async create(requisicao: Request, resposta: Response){
    // console.log(requisicao.files);
    const {
      nome,
      latitude,
      longitude,
      sobre,
      instrucoes,
      horario_atendimento,
      aberto_fim_semana
    } = requisicao.body;
  
    const orfanatosRepository = getRepository(Orfanato);

    const requisicaoImagens = requisicao.files as Express.Multer.File[];
    
    if(requisicaoImagens){
      const imagens = requisicaoImagens.map(imagem => {
        return { diretorio: imagem.filename }
      });
  
      const data = {
        nome,
        latitude,
        longitude,
        sobre,
        instrucoes,
        horario_atendimento,
        aberto_fim_semana,
        imagens
      };
  
      const schema = Yup.object().shape({
        nome: Yup.string().required('Nome é um campo obrigatório'),
        latitude: Yup.number().required(),
        longitude: Yup.number().required(),
        sobre: Yup.string().required().max(300),
        instrucoes: Yup.string().required(),
        horario_atendimento: Yup.string().required(),
        aberto_fim_semana: Yup.boolean().required(),
        imagens: Yup.array(
          Yup.object().shape({
            diretorio: Yup.string().required()
          })
        )
      });    
  
      await schema.validate(data, {
        abortEarly: false,      
      });
  
      const finalData = schema.cast(data) as Orfanato;
  
      const orfanato = orfanatosRepository.create(finalData);
    
      await orfanatosRepository.save(orfanato);
    
      return resposta.status(201).json(orfanato);
    }
    else {
      const data = {
        nome,
        latitude,
        longitude,
        sobre,
        instrucoes,
        horario_atendimento,
        aberto_fim_semana
      };
  
      const schema = Yup.object().shape({
        nome: Yup.string().required('Nome é um campo obrigatório'),
        latitude: Yup.number().required(),
        longitude: Yup.number().required(),
        sobre: Yup.string().required().max(300),
        instrucoes: Yup.string().required(),
        horario_atendimento: Yup.string().required(),
        aberto_fim_semana: Yup.boolean().required()        
      });    
  
      await schema.validate(data, {
        abortEarly: false,      
      });
  
      const finalData = schema.cast(data) as Orfanato;
  
      const orfanato = orfanatosRepository.create(finalData);
    
      await orfanatosRepository.save(orfanato);
    
      return resposta.status(201).json(orfanato);
    }    
  },

  async index(requisicao: Request, resposta: Response){
     const orfanatosRepository = getRepository(Orfanato);

     const orfanatos = await orfanatosRepository.find({
       relations: ['imagens']
     });

     return resposta.json(orfanatoView.renderMany(orfanatos));

    //return resposta.json({message: 'olá mundo'});
  },

  async show(requisicao: Request, resposta: Response){
    const { id } = requisicao.params;

    const orfanatosRepository = getRepository(Orfanato);

    const orfanato = await orfanatosRepository.findOneOrFail(id, {
      relations: ['imagens']
    });

    return resposta.json(orfanatoView.render(orfanato));
  },
};