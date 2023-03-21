import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { PrimeNGConfig } from 'primeng/api';

import { Category } from '../../categories/shared/categorie.model';
import { CategoryService } from '../../categories/shared/category.service';

import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

import { BaseResourceFormComponent } from '../../../shared/components/base-resource-form/base-resource-form.component';
@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css'],
})
export class EntryFormComponent
  extends BaseResourceFormComponent<Entry>
  implements OnInit
{
  categories?: Array<Category>;

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
    protected entryService: EntryService,
    protected primeNGConfig: PrimeNGConfig,
    protected categorieService: CategoryService,
    protected override injector: Injector
  ) {
    super(injector, new Entry(), entryService, Entry.fromJson);
  }

  form = this.formBuilder.group({
    id: [0],
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
    type: ['', [Validators.required]],
    amount: ['', [Validators.required]],
    date: ['', [Validators.required]],
    paid: [true, [Validators.required]],
    categoryId: [0, [Validators.required]],
  });

  override ngOnInit() {
    this.loadCategories();
    super.ngOnInit();
  }

  get typeOptions(): Array<any> {
    return Object.entries(Entry.types).map(([value, text]) => {
      return { text: text, value: value };
    });
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [0],
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      type: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      date: ['', [Validators.required]],
      paid: [true, [Validators.required]],
      categoryId: [0, [Validators.required]],
    });
  }

  private loadCategories() {
    this.categorieService
      .getAll()
      .subscribe((categories) => (this.categories = categories));
  }

  protected override creationPageTitle(): string {
    return 'Cadastro de Novo Lançamento';
  }

  protected override editionPageTitle(): string {
    const resourceName = this.resource.name || '';
    return `Editando Lançamento: ${resourceName}`;
  }
}
