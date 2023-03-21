import { Directive, OnInit } from '@angular/core';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseRourceService } from '../../services/base-resource.service';

@Directive()
export abstract class BaseResourceListComponent<T extends BaseResourceModel>
  implements OnInit
{
  resources: T[] = [];

  constructor(private resourcerService: BaseRourceService<T>) {}

  ngOnInit(): void {
    this.resourcerService.getAll().subscribe({
      next: (resources) =>
        (this.resources = resources.sort((a, b) => {
          return Number(b.id) - Number(a.id);
        })),
      error: (error) => alert('Erro ao carregar a lista'),
    });
  }

  deleteResource(resource: T): void {
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if (mustDelete)
      this.resourcerService.delete(Number(resource.id)).subscribe({
        next: (res) => {
          console.log(res);
          this.resources = this.resources.filter((e) => e != resource);
        },
        error: (error) => {
          alert('Erro ao tentar exluir!');
        },
      });
  }
}
