import multer from 'multer';
import path from 'path';

export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'),
    filename: (requisicao, arquivo, callBack) => {
      const nomeArquivo = `${Date.now()}-${arquivo.originalname}`;

      callBack(null, nomeArquivo);
    }
  })
};