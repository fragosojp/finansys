import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import { Category } from '../../categories/shared/categorie.model';
import { CategoryService } from '../../categories/shared/category.service';

import { Entry } from '../../entries/shared/entry.model';
import { EntryService } from '../../entries/shared/entry.service';

import * as currencyFormatter from 'currency-formatter';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  expanseTotal: any = 0;
  revenueTotal: any = 0;
  balance: any = 0;

  revenueChartData: any;
  expenseChartData: any;
  public lineChartPlugins = [ChartDataLabels];

  chartOptions = {
    plugins: {
      datalabels: {
        color: '#ffffff',
        font: {
          size: 25,
        },
      },
    },
    color: 'white',
    legend: {
      display: true,
      position: 'top',
    },
    scales: {
      x: {
        ticks: {
          color: '#ebedef',
        },
        grid: {
          color: 'rgba(255,255,255,0.2)',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'R$',
          color: 'white',
          font: {
            size: 16,
          },
        },
        ticks: {
          color: '#ebedef',
        },
        grid: {
          color: 'rgba(255,255,255,0.2)',
        },
      },
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

    if (!month || !year)
      alert('Você precisa selecionar o mês e o ano apara gerar os relatorios ');
    else
      this.entryService
        .getByMonthAndYear(month, year)
        .subscribe(this.setValues.bind(this));
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
    this.revenueChartData = this.getCharData(
      'revenue',
      'Gráfico de Receitas',
      '#2e7d32',
      'rgb(0, 77, 64)'
    );
    this.expenseChartData = this.getCharData(
      'expense',
      'Gráfico de Despesas',
      '#c62828',
      'rgb(183, 28, 28)'
    );
  }

  private getCharData(
    entryType: string,
    title: string,
    color: string,
    borderColor: string
  ) {
    const chartData: { categoryName?: string; totalAmount: number }[] = [];

    this.categories.forEach((category) => {
      //Filtrando lançamentos pela categoria
      const filteredEntries = this.entries.filter(
        (entry) => entry.categoryId == category.id && entry.type == entryType
      );
      //Se for encontrado lançamentos , some os valores no charData
      if (filteredEntries.length > 0) {
        const totalAmount = filteredEntries.reduce(
          (total, entry) =>
            total +
            currencyFormatter.unformat(entry.amount, {
              code: 'BRL',
            }),
          0
        );

        chartData.push({
          categoryName: category.name,
          totalAmount: totalAmount,
        });
      }
    });

    return {
      labels: chartData.map((item) => item.categoryName),
      datasets: [
        {
          label: title,
          backgroundColor: color,
          borderColor: borderColor,
          borderWidth: 1,
          data: chartData.map((item) => item.totalAmount),
        },
      ],
      plugin: [ChartDataLabels],
    };
  }
}
