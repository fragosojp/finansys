import { Categorie } from './../../categories/shared/categorie.model';

export class Entry {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public type?: string,
    public amount?: string,
    public date?: string,
    public paid?: boolean,
    public categorieId?: number,
    public categorie?: Categorie
  ) {}

  static types = {
    expense: 'Despesa',
    renevue: 'Receita',
  };

  get paidText() {
    return this.paid ? 'Pago' : 'Pendente';
  }
}
