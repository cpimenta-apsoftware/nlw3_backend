import Orfanato from '../models/Orfanato';
import imagemView from './imagens_view';

export default {
  render(orfanato: Orfanato) {
    return {
      id: orfanato.id,
      nome: orfanato.nome,
      latitude: orfanato.latitude,
      longitude: orfanato.longitude,
      sobre: orfanato.sobre,
      instrucoes: orfanato.instrucoes,
      horario_atendimento: orfanato.horario_atendimento,
      aberto_fim_semana: orfanato.aberto_fim_semana,
      imagens: imagemView.renderMany(orfanato.imagens)
    };
  },

  renderMany(orfanatos: Orfanato[]){
    return orfanatos.map(orfanato => this.render(orfanato));
  }
};