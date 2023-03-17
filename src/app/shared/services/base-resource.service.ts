import { BaseResourceModel } from '../models/base-resource.model';

import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export abstract class BaseRourceService<T extends BaseResourceModel> {
  protected http: HttpClient;

  constructor(protected apiPath: string, protected injector: Injector) {
    this.http = injector.get(HttpClient);
  }

  getll(): Observable<T[]> {
    return this.http
      .get(this.apiPath)
      .pipe(catchError(this.handleError), map(this.jsonDatatoResources));
  }

  //METHOD RETURN CATEGORIA ID
  getById(id: number): Observable<T> {
    const url = `${this.apiPath}/${id}`;
    return this.http
      .get(url)
      .pipe(catchError(this.handleError), map(this.jsonDatatoResource));
  }

  create(resouce: T): Observable<T> {
    return this.http
      .post(this.apiPath, resouce)
      .pipe(catchError(this.handleError), map(this.jsonDatatoResource));
  }

  update(resouce: T): Observable<T> {
    const url = `${this.apiPath}/${resouce.id}`;

    return this.http.put(url, resouce).pipe(
      catchError(this.handleError),
      map(() => resouce)
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  //PROTECTED METHODS
  protected jsonDatatoResources(jsonData: any[]): T[] {
    const resources: T[] = [];
    jsonData.forEach((e) => resources.push(e as T));
    return resources;
  }

  protected jsonDatatoResource(jsonData: any): T {
    return jsonData as T;
  }

  protected handleError(error: any): Observable<any> {
    console.log('Erro na requisição => ', error);
    return throwError(() => error);
  }
}
