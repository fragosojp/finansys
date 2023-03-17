import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Category } from './categorie.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiPath: string = 'api/categories';

  constructor(private http: HttpClient) {}

  getll(): Observable<Category[]> {
    return this.http
      .get(this.apiPath)
      .pipe(catchError(this.handleError), map(this.jsonDatatoCategories));
  }

  //METHOD RETURN CATEGORIA ID
  getById(id: number): Observable<Category> {
    const url = `${this.apiPath}/${id}`;
    return this.http
      .get(url)
      .pipe(catchError(this.handleError), map(this.jsonDatatoCategorie));
  }

  create(categorie: Category): Observable<Category> {
    return this.http
      .post(this.apiPath, categorie)
      .pipe(catchError(this.handleError), map(this.jsonDatatoCategorie));
  }

  update(categorie: Category): Observable<Category> {
    const url = `${this.apiPath}/${categorie.id}`;

    return this.http.put(url, categorie).pipe(
      catchError(this.handleError),
      map(() => categorie)
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

  private jsonDatatoCategories(jsonData: any[]): Category[] {
    const categories: Category[] = [];
    jsonData.forEach((e) => categories.push(e as Category));
    return categories;
  }

  private jsonDatatoCategorie(jsonData: any): Category {
    return jsonData as Category;
  }

  private handleError(error: any): Observable<any> {
    console.log('Erro na requisição => ', error);
    return throwError(() => error);
  }
}
