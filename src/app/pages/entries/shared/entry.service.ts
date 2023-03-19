import { Injectable, Injector } from '@angular/core';
import { BaseRourceService } from '../../../shared/services/base-resource.service';
import { Entry } from './entry.model';
import { CategoryService } from '../../categories/shared/category.service';

import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class EntryService extends BaseRourceService<Entry> {
  protected override apiPath: string = 'api/entries';

  constructor(
    protected override injector: Injector,
    private categoryService: CategoryService
  ) {
    super('api/entries', injector, Entry.fromJson);
  }

  override create(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(Number(entry.categorieId)).pipe(
      mergeMap((category) => {
        entry.categorie = category;
        return super.create(entry);
      })
    );
  }

  override update(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(Number(entry.categorieId)).pipe(
      mergeMap((category) => {
        entry.categorie = category;
        return super.update(entry);
      })
    );
  }
}
