import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'entries',
    loadChildren: () =>
      import('./pages/entries/entries.module').then((p) => p.EntriesModule),
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./pages/categories/categories.module').then(
        (p) => p.CategoriesModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
