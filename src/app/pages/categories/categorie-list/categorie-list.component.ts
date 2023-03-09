import { Component, OnInit } from '@angular/core';
import { Categorie } from '../shared/categorie.model';
import { CategoryService } from '../shered/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.css'],
})
export class CategorieListComponent implements OnInit {
  categories: Categorie[] = [];
  teste123: string = '123';

  constructor(private categorieService: CategoryService) {}

  ngOnInit(): void {
    this.categorieService.getll().subscribe(
      (categories) => (this.categories = categories),
      (error) => alert('Erro ao carregar a lista')
    );
  }

  deleteCategorie(categorie: any) {
    console.log(categorie);
    this.categorieService.delete(categorie.id).subscribe(
      () => (this.categories = this.categories.filter((e) => e != categorie)),
      () => alert('Erro ao tentar exluir!')
    );
  }

  teste(): void {
    return console.log('teste');
  }
}
