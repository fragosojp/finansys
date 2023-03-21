import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategorieListComponent } from './categorie-list/categorie-list.component';
import { CategoryFormComponent } from './categorie-form/category-form.component';

@NgModule({
  imports: [SharedModule, CategoriesRoutingModule],
  declarations: [CategorieListComponent, CategoryFormComponent],
})
export class CategoriesModule {}
