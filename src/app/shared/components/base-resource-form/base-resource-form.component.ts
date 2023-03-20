import {
  AfterContentChecked,
  OnInit,
  Injector,
  Directive,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseRourceService } from '../../services/base-resource.service';

import { switchMap } from 'rxjs';

import * as toastr from 'toastr';

@Directive()
export abstract class BaseResourceFormComponent<T extends BaseResourceModel>
  implements OnInit, AfterContentChecked
{
  currentAction: string = 'new'; // Novo / Alterar
  resourceForm?: FormGroup; // definição de Formulario
  pageTitle?: string; // titulo da página, Editando ou
  serverErrorMessages?: string[]; // array de erros, mensagems retornadas do servidor
  submittingForm: boolean = false; // Controlar botão de submeter, desabilitar até que o server retorne uma resposta

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseRourceService<T>,
    protected jsonDataToResourceFn: (jsonData: any) => T
  ) {
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
  }

  ngOnInit() {
    this.setCurrentAction(); // IDENTIFICAR SE ESTA EDITANDO OU CRIANDO
    this.buildResourceForm();
    this.loadResource(); // VERIFICAR SE ESTA EDITANTO OU CRIANDO
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;
    if (this.currentAction == 'new') this.createResource();
    else this.updateResource();
  }

  //PRIVATE METHODS
  protected setCurrentAction() {
    const actionCreate = this.route.snapshot.url[0].path == 'new';

    actionCreate ? (this.currentAction = 'new') : (this.currentAction = 'edit');
  }

  protected loadResource() {
    if (this.currentAction == 'edit') {
      this.route.paramMap
        .pipe(
          switchMap((params) =>
            this.resourceService.getById(Number(params.get('id')))
          )
        )
        .subscribe({
          next: (resource) => {
            this.resource = resource;
            this.resourceForm?.patchValue(resource); // Binds loaded resouce data to CategoryForm
          },
          error: (error) =>
            alert('Ocorreu um erro no servior, tente mais tarde!'),
        });
    }
  }

  protected setPageTitle() {
    if (this.currentAction == 'new') this.pageTitle = this.creationPageTitle();
    else {
      this.pageTitle = this.editionPageTitle();
    }
  }

  protected creationPageTitle(): string {
    return 'Novo';
  }

  protected editionPageTitle(): string {
    return 'Edição';
  }

  public createResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm?.value);
    this.resourceService.create(resource).subscribe({
      next: (resource) => this.actionsFormSucess(resource),
      error: (error) => this.actionsForError(error),
    });
  }

  protected updateResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm?.value);
    this.resourceService.update(resource).subscribe({
      next: (resource) => this.actionsFormSucess(resource),
      error: (error) => this.actionsForError(error),
    });
  }

  protected actionsFormSucess(resource: T) {
    toastr.success('Solicitação Processada com sucesso!');
    const baseComponentPath: string = this.route.snapshot.parent!.url[0].path;
    this.router
      .navigateByUrl(baseComponentPath, { skipLocationChange: true }) // não cria um historico de navegação com o metodo skipLocationChange
      .then(() =>
        this.router.navigate([baseComponentPath, resource.id, 'edit'])
      );
  }

  protected actionsForError(error: any) {
    toastr.error('Ocorreu um erro ao processar a sua solicitação!');
    this.submittingForm = false;

    if (error.status === 422)
      this.serverErrorMessages = JSON.parse(error._body).errors;
    else
      this.serverErrorMessages = [
        'Falha na comunicação com o servidor. por favor, tente mais tarde.',
      ];
  }

  protected abstract buildResourceForm(): void;
}
