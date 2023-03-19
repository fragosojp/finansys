import { Component, AfterContentChecked, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Category } from '../shared/categorie.model';
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
  //categoryForm?: FormGroup; // definição de Formulario
  pageTitle?: string; // titulo da página, Editando ou
  serverErrorMessages?: string[]; // array de erros, mensagems retornadas do servidor
  submittingForm: boolean = false; // Controlar botão de submeter, desabilitar até que o server retorne uma resposta
  categorie: Category = new Category(); // proprio objeto de Category

  form = this.formBuilder.group({
    id: [0],
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.setCurrentAction(); // IDENTIFICAR SE ESTA EDITANDO OU CRIANDO
    this.loadCategorie(); // VERIFICAR SE ESTA EDITANTO OU CRIANDO
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;
    if (this.currentAction == 'new') this.createCategorie();
    else this.updateCategorie();
  }

  //PRIVATE METHODS
  private setCurrentAction() {
    const actionCreate = this.route.snapshot.url[0].path == 'new';

    actionCreate ? (this.currentAction = 'new') : (this.currentAction = 'edit');
  }

  private loadCategorie() {
    if (this.currentAction == 'edit') {
      this.route.paramMap
        .pipe(
          switchMap((params) =>
            this.categoryService.getById(Number(params.get('id')))
          )
        )
        .subscribe({
          next: (categorie) => {
            this.categorie = categorie;
            this.form.patchValue(categorie); // Binds loaded categorie data to CategoryForm
          },
          error: (error) =>
            alert('Ocorreu um erro no servior, tente mais tarde!'),
        });
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

  public createCategorie() {
    const categorie: Category = Object.assign(new Category(), this.form.value);
    this.categoryService.create(categorie).subscribe({
      next: (categorie) => this.actionsFormSucess(categorie),
      error: (error) => this.actionsForError(error),
    });
  }

  private updateCategorie() {
    const categorie: Category = Object.assign(new Category(), this.form.value);
    this.categoryService.update(categorie).subscribe({
      next: (categorie) => this.actionsFormSucess(categorie),
      error: (error) => this.actionsForError(error),
    });
  }

  private actionsFormSucess(categorie: Category) {
    toastr.success('Solicitação Processada com sucesso!');
    this.router
      .navigateByUrl('categories', { skipLocationChange: true }) // não cria um historico de navegação com o metodo skipLocationChange
      .then(() => this.router.navigate(['categories', categorie.id, 'edit']));
  }

  private actionsForError(error: any) {
    toastr.error('Ocorreu um erro ao processar a sua solicitação!');
    this.submittingForm = false;

    if (error.status === 422)
      this.serverErrorMessages = JSON.parse(error._body).errors;
    else
      this.serverErrorMessages = [
        'Falha na comunicação com o servidor. por favor, tente mais tarde.',
      ];
  }
}
