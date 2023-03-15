import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Categorie } from './pages/categories/shared/categorie.model';
import { Entry } from './pages/entries/shared/entry.model';

export class InMemoryDatabase implements InMemoryDbService {
  createDb() {
    const categories: Categorie[] = [
      {
        id: 1,
        name: 'Moradia',
        description: 'Teste',
      },
      {
        id: 2,
        name: 'Saúde',
        description: 'Teste',
      },
      {
        id: 3,
        name: 'Lazer',
        description: 'Teste',
      },
      {
        id: 4,
        name: 'Salário',
        description: 'Teste',
      },
      {
        id: 5,
        name: 'Freelas',
        description: 'Teste',
      },
    ];

    const entries: Entry[] = [
      {
        id: 1,
        name: 'Gás de Cozinha',
        categorieId: categories[0],
        categorie: categories[0],
        paid: true,
        date: '14/10/2018',
        amount: '70,80',
        type: 'expense',
        description: 'Qualquer descrição para essa despesa',
      } as Entry,
      {
        id: 2,
        name: 'Suplementos',
        categorieId: categories[1],
        categorie: categories[1],
        paid: false,
        date: '14/10/2018',
        amount: '15,00',
        type: 'revenue',
      } as Entry,
    ];

    return { categories, entries };
  }
}
