import { Domingos_feriados } from './Domingos_Feriados';
import { Dias } from './Dias';
import { Sabados } from './Sabados';
export class Onibus {

  constructor(public linha: string,
    public rotas: String[]=new Array<String>(),
    public dias: Dias,
    public sabados: Sabados,
    public domingos_feriados: Domingos_feriados) {

  }

}
