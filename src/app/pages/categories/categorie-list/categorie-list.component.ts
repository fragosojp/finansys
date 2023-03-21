import { Component } from '@angular/core';

import { BaseResourceListComponent } from '../../../shared/components/base-resource-list/base-respirce-list.component';

import { Category } from '../shared/categorie.model';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.css'],
})
export class CategorieListComponent extends BaseResourceListComponent<Category> {
  constructor(private categorieService: CategoryService) {
    super(categorieService);
  }
}
