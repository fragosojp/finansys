import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Categorie } from './pages/categories/shared/categorie.model';

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

    return { categories };
  }
}
