import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';

import { BaseResourceFormComponent } from '../../../shared/components/base-resource-form/base-resource-form.component';

import { Category } from '../shared/categorie.model';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent extends BaseResourceFormComponent<Category> {
  constructor(
    protected categoryService: CategoryService,
    protected override injector: Injector
  ) {
    super(injector, new Category(), categoryService, Category.fromJson);
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [0],
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  //sobreescrever os metos da classe base
  protected override creationPageTitle(): string {
    return 'Cadastro de Nova Categoria';
  }

  protected override editionPageTitle(): string {
    const categoryName = this.resource.name || '';
    return `Editando Categoria: ${categoryName}`;
  }
}
