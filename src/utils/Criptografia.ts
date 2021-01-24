import bcrypt from 'bcrypt';

export default class Criptografia {

  private iiRodadas = 10;
  private isValor: string;

  constructor(asValor: string) {
    this.isValor = asValor;
  }

  async obterValorCriptografado(): Promise<string> {
    return await bcrypt.hash(this.isValor, this.iiRodadas);
  }

  async validarCriptografia(asValorCriptografado: string) : Promise<boolean> {
    return await bcrypt.compare(this.isValor, asValorCriptografado);
  }
}