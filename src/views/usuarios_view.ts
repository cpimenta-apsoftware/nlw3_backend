import Usuario from '../models/Usuario';

export default {
  render(usuario: Usuario) {
    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email      
    };
  },

  renderMany(usuarios: Usuario[]){
    return usuarios.map(usuario => this.render(usuario));
  }
};