import { Injectable, Injector } from '@angular/core';

import { Category } from './categorie.model';

import { BaseRourceService } from 'src/app/shared/services/base-resource.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends BaseRourceService<Category> {
  constructor(protected override injector: Injector) {
    super('api/categories', injector);
  }
}
