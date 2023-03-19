import { BaseResourceModel } from '../models/base-resource.model';

import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export abstract class BaseRourceService<T extends BaseResourceModel> {
  protected http: HttpClient;

  constructor(
    protected apiPath: string,
    protected injector: Injector,
    protected jsonDataToResourceFn: (jsonData: any) => T
  ) {
    this.http = injector.get(HttpClient);
  }

  getAll(): Observable<T[]> {
    return this.http
      .get(this.apiPath)
      .pipe(
        catchError(this.handleError),
        map(this.jsonDataToResources.bind(this))
      );
  }

  //METHOD RETURN CATEGORIA ID
  getById(id: number): Observable<T> {
    const url = `${this.apiPath}/${id}`;
    return this.http
      .get(url)
      .pipe(
        map(this.jsonDataToResource.bind(this)),
        catchError(this.handleError)
      );
  }

  create(resouce: T): Observable<T> {
    const url = `${this.apiPath}/${resouce.id}`;
    console.log(url);
    return this.http
      .post(url, resouce)
      .pipe(
        map(this.jsonDataToResource.bind(this)),
        catchError(this.handleError)
      );
  }

  update(resouce: T): Observable<T> {
    const url = `${this.apiPath}/${resouce.id}`;

    return this.http.put(url, resouce).pipe(
      map(() => resouce),
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      map(() => null),
      catchError(this.handleError)
    );
  }

  //PROTECTED METHODS
  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];
    jsonData.forEach((e) => resources.push(this.jsonDataToResourceFn(e)));
    return resources;
  }

  protected jsonDataToResource(jsonData: any): T {
    return this.jsonDataToResourceFn(jsonData);
  }

  protected handleError(error: any): Observable<any> {
    console.log('Erro na requisição => ', error);
    return throwError(() => error);
  }
}
