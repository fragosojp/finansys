import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorieFormComponent } from './categorie-form/categorie-form.component';
import { CategorieListComponent } from './categorie-list/categorie-list.component';

const routes: Routes = [
  {
    path: '',
    component: CategorieListComponent,
  },
  {
    path: 'new',
    component: CategorieFormComponent,
  },
  {
    path: ':id/edit',
    component: CategorieFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
