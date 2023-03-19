import { Component, AfterContentChecked, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

import { switchMap } from 'rxjs';

import * as toastr from 'toastr';

import { Category } from '../../categories/shared/categorie.model';
import { CategoryService } from '../../categories/shared/category.service';

import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css'],
})
export class EntryFormComponent implements OnInit, AfterContentChecked {
  currentAction: string = 'new'; // Novo / Alterar
  pageTitle?: string; // titulo da página, Editando ou
  serverErrorMessages?: string[]; // array de erros, mensagems retornadas do servidor
  submittingForm: boolean = false; // Controlar botão de submeter, desabilitar até que o server retorne uma resposta
  entry: Entry = new Entry(); // proprio objeto de Category
  categories1?: Array<Category>;

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsseparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ',',
  };

  ptBR = {
    firstDayOfWeek: 0,
    dayNames: [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ],
    monthNamesShort: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ],
    today: 'Hoje',
    clear: 'Limpar',
  };

  constructor(
    private entryService: EntryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private primeNGConfig: PrimeNGConfig,
    private categorieService: CategoryService
  ) {}

  form = this.formBuilder.group({
    id: [0],
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
    type: ['', [Validators.required]],
    amount: ['', [Validators.required]],
    date: ['', [Validators.required]],
    paid: [true, [Validators.required]],
    categorieId: [0, [Validators.required]],
  });

  ngOnInit() {
    this.setCurrentAction(); // IDENTIFICAR SE ESTA EDITANDO OU CRIANDO
    this.loadEntry(); // VERIFICAR SE ESTA EDITANTO OU CRIANDO
    this.primeNGConfig.setTranslation(this.ptBR);
    this.loadCategories();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;
    if (this.currentAction == 'new') this.createEntry();
    else this.updateEntry();
  }

  get typeOptions(): Array<any> {
    return Object.entries(Entry.types).map(([value, text]) => {
      return { text: text, value: value };
    });
  }

  //PRIVATE METHODS
  private setCurrentAction() {
    const actionCreate = this.route.snapshot.url[0].path == 'new';

    actionCreate ? (this.currentAction = 'new') : (this.currentAction = 'edit');
  }

  private loadEntry() {
    if (this.currentAction == 'edit') {
      this.route.paramMap
        .pipe(
          switchMap((params) =>
            this.entryService.getById(Number(params.get('id')))
          )
        )
        .subscribe({
          next: (entry) => {
            this.entry = entry;
            this.form.patchValue(entry);
            console.table(entry); // Binds loaded entry data to CategoryForm
          },
          error: (error) =>
            alert('Ocorreu um erro no servior, tente mais tarde!'),
        });
    }
  }

  private loadCategories() {
    this.categorieService
      .getAll()
      .subscribe((categories) => (this.categories1 = categories));
  }

  private setPageTitle() {
    if (this.currentAction == 'new')
      this.pageTitle = 'Cadastro de Nova Categoria';
    else {
      const entryName = this.entry.name || '';
      this.pageTitle = `Editando Lançamento: ${entryName}`;
    }
  }

  public createEntry() {
    const entry: Entry = Entry.fromJson(this.form.value);
    this.entryService.create(entry).subscribe({
      next: (entry) => this.actionsFormSucess(entry),
      error: (error) => this.actionsForError(error),
    });
  }

  private updateEntry() {
    const entry: Entry = Entry.fromJson(this.form.value);
    console.log(entry);
    this.entryService.update(entry).subscribe({
      next: (entry) => this.actionsFormSucess(entry),
      error: (error) => this.actionsForError(error),
    });
  }

  private actionsFormSucess(entry: Entry) {
    toastr.success('Solicitação Processada com sucesso!');
    this.router
      .navigateByUrl('entries', { skipLocationChange: true }) // não cria um historico de navegação com o metodo skipLocationChange
      .then(() => this.router.navigate(['entries', entry.id, 'edit']));
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
