import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';


interface ValidacaoErros {
  [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (erro, requisicao, resposta, next) => {
  console.error(erro);

  if(erro instanceof ValidationError){
    let erros: ValidacaoErros = {};

    erro.inner.forEach(err => {
      erros[err.path] = err.errors;
    });

    //Erro de requisição mal feita
    return resposta.status(400).json({mensagem:'Falhas na validação', erros})
  }

  //Erro interno do servidor
  return resposta.status(500).json({message: 'Erro interno do servidor'});
}

export default errorHandler;