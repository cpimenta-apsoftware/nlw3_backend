import Imagem from '../models/Imagem';

export default {
  render(imagem: Imagem) {    
    return {      
      id: imagem.id,      
      url: `http://${require("ip").address()}:3333/uploads/${imagem.diretorio}`,            
    };
  },

  renderMany(imagens: Imagem[]){
    return imagens.map(imagem => this.render(imagem));
  }
};