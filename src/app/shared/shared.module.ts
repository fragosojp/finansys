import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { RouterModule } from '@angular/router';
import { PagaHeaderComponent } from './components/paga-header/paga-header.component';
@NgModule({
  declarations: [BreadCrumbComponent, PagaHeaderComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    BreadCrumbComponent,
    PagaHeaderComponent,
  ],
})
export class SharedModule {}
