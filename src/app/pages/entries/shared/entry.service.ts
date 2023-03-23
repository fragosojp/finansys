import { Injectable, Injector } from '@angular/core';
import { BaseRourceService } from '../../../shared/services/base-resource.service';
import { Entry } from './entry.model';
import { CategoryService } from '../../categories/shared/category.service';

import { Observable } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class EntryService extends BaseRourceService<Entry> {
  constructor(
    protected override injector: Injector,
    private categoryService: CategoryService
  ) {
    super('api/entries', injector, Entry.fromJson);
  }

  override create(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToServer(entry, super.create.bind(this));
  }

  override update(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToServer(entry, super.update.bind(this));
  }

  private setCategoryAndSendToServer(
    entry: Entry,
    sendFn: (entry: Entry) => Observable<Entry>
  ): Observable<Entry> {
    return this.categoryService.getById(Number(entry.categoryId)).pipe(
      mergeMap((category) => {
        entry.category = category;
        return sendFn(entry);
      }),
      catchError(this.handleError)
    );
  }
}
