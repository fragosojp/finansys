import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryFormComponent } from './categorie-form/category-form.component';
import { CategorieListComponent } from './categorie-list/categorie-list.component';

const routes: Routes = [
  {
    path: '',
    component: CategorieListComponent,
  },
  {
    path: 'new',
    component: CategoryFormComponent,
  },
  {
    path: ':id/edit',
    component: CategoryFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
