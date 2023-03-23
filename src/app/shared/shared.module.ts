import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { RouterModule } from '@angular/router';
import { PagaHeaderComponent } from './components/paga-header/paga-header.component';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';
@NgModule({
  declarations: [
    BreadCrumbComponent,
    PagaHeaderComponent,
    FormFieldErrorComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    BreadCrumbComponent,
    PagaHeaderComponent,
    FormFieldErrorComponent,
  ],
})
export class SharedModule {}
