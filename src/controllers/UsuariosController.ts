import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Usuario from '../models/Usuario';
import UsuarioView from '../views/usuarios_view'
import * as Yup from 'yup';
import Criptografia from '../utils/Criptografia';

export default {
  async create(requisicao: Request, resposta: Response) {
    const {
      nome,
      email,
      senha,
    } = requisicao.body;

    const data = {
      nome,
      email,
      senha,
    };

    const schema = Yup.object().shape({
      nome: Yup.string().required('Nome é um campo obrigatório'),
      email: Yup.string().required('E-mail é um campo obrigatório'),
      senha: Yup.string().required('Senha é um campo obrigatório').min(4),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    data.senha = await new Criptografia(data.senha).obterValorCriptografado();

    const finalData = schema.cast(data) as Usuario;

    const loUsuariosRepository = getRepository(Usuario);
    const loUsuario = loUsuariosRepository.create(finalData);
    await loUsuariosRepository.save(loUsuario);

    return resposta.status(201).json(loUsuario);
  },

  async index(requisicao: Request, resposta: Response) {
    const loUsuariosRepository = getRepository(Usuario);
    const loaUsuarios = await loUsuariosRepository.find();
    return resposta.json(UsuarioView.renderMany(loaUsuarios));
  },

  async show(requisicao: Request, resposta: Response) {
    const { id } = requisicao.params;
    const loUsuariosRepository = getRepository(Usuario);
    const loUsuario = await loUsuariosRepository.findOneOrFail(id);
    return resposta.json(UsuarioView.render(loUsuario));
  },
};