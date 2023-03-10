import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategorieListComponent } from './categorie-list/categorie-list.component';
import { CategorieFormComponent } from './categorie-form/categorie-form.component';

@NgModule({
  declarations: [CategorieListComponent, CategorieFormComponent],
  imports: [CommonModule, CategoriesRoutingModule, ReactiveFormsModule],
})
export class CategoriesModule {}
