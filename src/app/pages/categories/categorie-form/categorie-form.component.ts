import { Component, AfterContentChecked, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Categorie } from '../shared/categorie.model';
import { CategoryService } from '../shared/category.service';

import { switchMap } from 'rxjs';

import * as toastr from 'toastr';

@Component({
  selector: 'app-category-form',
  templateUrl: './categorie-form.component.html',
  styleUrls: ['./categorie-form.component.css'],
})
export class CategorieFormComponent implements OnInit, AfterContentChecked {
  currentAction: string = 'new'; // Novo / Alterar
  categoryForm?: FormGroup; // definição de Formulario
  pageTitle?: string; // titulo da página, Editando ou
  serverErrorMessages?: string[]; // array de erros, mensagems retornadas do servidor
  submittingForm: boolean = false; // Controlar botão de submeter, desabilitar até que o server retorne uma resposta
  categorie: Categorie = new Categorie(); // proprio objeto de Category

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategorie();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  //PRIVATE METHODS
  private setCurrentAction() {
    const actionCreate = this.route.snapshot.url[0].path == 'new';

    actionCreate ? (this.currentAction = 'new') : (this.currentAction = 'edit');
  }

  private buildCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
    });
  }

  private loadCategorie() {
    if (this.currentAction == 'edit') {
      this.route.paramMap
        .pipe(
          switchMap((params) =>
            this.categoryService.getById(Number(params.get('id')))
          )
        )
        .subscribe(
          (categorie) => {
            this.categorie = categorie;
            this.categoryForm?.patchValue(categorie); // Binds loaded categorie data to CategoryForm
          },
          (error) => alert('Ocorreu um erro no servior, tente mais tarde!')
        );
    }
  }

  private setPageTitle() {
    if (this.currentAction == 'new')
      this.pageTitle = 'Cadastro de Nova Categoria';
    else {
      const categorieName = this.categorie.name || '';
      this.pageTitle = `Editando Categoria: ${categorieName}`;
    }
  }
}
