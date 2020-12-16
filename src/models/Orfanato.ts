import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm';
import Imagem from './Imagem';

@Entity('orfanatos')
export default class Orfanato {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nome: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  sobre: string;

  @Column()
  instrucoes: string;

  @Column()
  horario_atendimento: string;

  @Column()
  aberto_fim_semana: boolean;

  @OneToMany(() => Imagem, imagem => imagem.orfanato, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({name: 'id_orfanato'})
  imagens: Imagem[];
}