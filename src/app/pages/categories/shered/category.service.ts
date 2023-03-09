import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Categorie } from '../shared/categorie.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiPath: string = 'api/categoies';

  constructor(private http: HttpClient) {}

  getll(): Observable<Categorie[]> {
    return this.http
      .get(this.apiPath)
      .pipe(catchError(this.handleError), map(this.jsonDatatoCategories));
  }

  //METHOD RETURN CATEGORIA ID
  getById(id: number): Observable<Categorie> {
    const url = `${this.apiPath}/${id}`;
    return this.http
      .get(url)
      .pipe(catchError(this.handleError), map(this.jsonDatatoCategorie));
  }

  create(categorie: Categorie): Observable<Categorie> {
    return this.http
      .post(this.apiPath, categorie)
      .pipe(catchError(this.handleError), map(this.jsonDatatoCategorie));
  }

  update(categorie: Categorie): Observable<Categorie> {
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

  private jsonDatatoCategories(jsonData: any[]): Categorie[] {
    const categories: Categorie[] = [];
    jsonData.forEach((e) => categories.push(e as Categorie));
    return categories;
  }

  private jsonDatatoCategorie(jsonData: any): Categorie {
    return jsonData as Categorie;
  }

  private handleError(error: any): Observable<any> {
    console.log('Erro na requisição => ', error);
    return throwError(() => error);
  }
}
