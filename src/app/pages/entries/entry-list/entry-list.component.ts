import { Component, OnInit } from '@angular/core';
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css'],
})
export class EntryListComponent implements OnInit {
  entries: Entry[] = [];

  constructor(private entryService: EntryService) {}

  ngOnInit(): void {
    this.entryService.getll().subscribe(
      (entries) => (this.entries = entries),
      (error) => alert('Erro ao carregar a lista')
    );
  }

  deleteEntry(entry: Entry): void {
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if (mustDelete)
      this.entryService.delete(Number(entry.id)).subscribe(
        (res) => {
          console.log(res);
          this.entries = this.entries.filter((e) => e != entry);
        },
        (error) => {
          alert('Erro ao tentar exluir!');
        }
      );
  }
}
