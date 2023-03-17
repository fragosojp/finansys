import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Entry } from './entry.model';
import { CategoryService } from '../../categories/shared/category.service';

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  private apiPath: string = 'api/entries';

  constructor(
    private http: HttpClient,
    private categoryService: CategoryService
  ) {}

  getll(): Observable<Entry[]> {
    return this.http
      .get(this.apiPath)
      .pipe(catchError(this.handleError), map(this.jsonDatatoEntries));
  }

  //METHOD RETURN ENTRY ID
  getById(id: number): Observable<Entry> {
    const url = `${this.apiPath}/${id}`;
    return this.http
      .get(url)
      .pipe(catchError(this.handleError), map(this.jsonDatatoEntrie));
  }

  create(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(Number(entry.categorieId)).pipe(
      mergeMap((category) => {
        entry.categorie = category;

        return this.http
          .post(this.apiPath, entry)
          .pipe(catchError(this.handleError), map(this.jsonDatatoEntrie));
      })
    );
  }

  update(entry: Entry): Observable<Entry> {
    const url = `${this.apiPath}/${entry.id}`;

    return this.categoryService.getById(Number(entry.categorieId)).pipe(
      mergeMap((category) => {
        entry.categorie = category;

        return this.http.put(url, entry).pipe(
          catchError(this.handleError),
          map(() => entry)
        );
      })
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  //PRIVATE METHODS

  private jsonDatatoEntries(jsonData: any[]): Entry[] {
    const entries: Entry[] = [];
    jsonData.forEach((e) => {
      const entry = Object.assign(new Entry(), e);
      entries.push(entry);
    });
    return entries;
  }

  private jsonDatatoEntrie(jsonData: any): Entry {
    return Object.assign(new Entry(), jsonData);
  }

  private handleError(error: any): Observable<any> {
    console.log('Erro na requisição => ', error);
    return throwError(() => error);
  }
}
