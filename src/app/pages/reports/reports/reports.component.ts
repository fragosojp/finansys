import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import { Category } from '../../categories/shared/categorie.model';
import { CategoryService } from '../../categories/shared/category.service';

import { Entry } from '../../entries/shared/entry.model';
import { EntryService } from '../../entries/shared/entry.service';

import * as currencyFormatter from 'currency-formatter';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  expanseTotal: any = 0;
  revenueTotal: any = 0;
  balance: any = 0;

  exprenseChartData: any;
  revenueChartData: any;
  chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  categories: Category[] = [];
  entries: Entry[] = [];

  @ViewChild('month', { static: true }) month: ElementRef | undefined;
  @ViewChild('year', { static: true }) year: ElementRef | undefined;

  constructor(
    private entryService: EntryService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.categoryService
      .getAll()
      .subscribe((categories) => (this.categories = categories));
  }

  generateReports() {
    const month = this.month?.nativeElement.value;
    const year = this.year?.nativeElement.value;

    if (!month || !month)
      alert('Você precisa selecionar o mês e o ano apara gerar os relatorios ');
    else
      this.entryService
        .getByMonthAndYear(month, year)
        .subscribe(this.setValues.bind(this));

    this.setChartData();
  }

  private setValues(entries: Entry[]) {
    this.entries = entries;
    this.calculateBalance();
    this.setChartData();
  }

  private calculateBalance() {
    let expenseTotal = 0;
    let revenueTotal = 0;

    this.entries.forEach((entry) => {
      if (entry.type == 'revenue')
        revenueTotal += currencyFormatter.unformat(entry.amount, {
          code: 'BRL',
        });
      else
        expenseTotal += currencyFormatter.unformat(entry.amount, {
          code: 'BRL',
        });
    });

    this.expanseTotal = currencyFormatter.format(expenseTotal, { code: 'BRL' });
    this.revenueTotal = currencyFormatter.format(revenueTotal, { code: 'BRL' });
    this.balance = currencyFormatter.format(revenueTotal - expenseTotal, {
      code: 'BRL',
    });
  }

  private setChartData() {
    this.categories.forEach((category) => {
      //Filtrando lançamentos pela categoria
      const filteredEntries = this.entries.filter(
        (entry) => entry.categoryId == category.id && entry.type == 'revenue'
      );
      //Se for encontrado lançamentos , some os valores no charData
      if (filteredEntries.length > 0) {
        const totalAmount = filteredEntries.reduce((total, entry) => total);
        console.log(totalAmount);
      }
    });
  }
}
