import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import Orfanato from './Orfanato';

@Entity('imagens')
export default class Imagem {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  diretorio: string;

   @ManyToOne(() => Orfanato, orfanato => orfanato.imagens)
   @JoinColumn({name: 'id_orfanato'})
   orfanato: Orfanato;
}