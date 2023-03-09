import { Component, OnInit } from '@angular/core';
import { Categorie } from '../shared/categorie.model';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.css'],
})
export class CategorieListComponent implements OnInit {
  categories: Categorie[] = [];

  constructor(private categorieService: CategoryService) {}

  ngOnInit(): void {
    this.categorieService.getll().subscribe(
      (categories) => (this.categories = categories),
      (error) => alert('Erro ao carregar a lista')
    );
  }

  deleteCategorie(categorie: Categorie): void {
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if (mustDelete)
      this.categorieService.delete(Number(categorie.id)).subscribe(
        (res) => {
          console.log(res);
          this.categories = this.categories.filter((e) => e != categorie);
        },
        (error) => {
          alert('Erro ao tentar exluir!');
        }
      );
  }
}
