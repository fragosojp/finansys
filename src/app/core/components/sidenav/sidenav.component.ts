import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  @Input() sideNavStatus: Boolean = false;

  list = [
    {
      number: '1',
      name: 'home',
      icon: 'pi pi-home',
      link: '/',
    },
    {
      number: '2',
      name: 'Relatórios',
      icon: 'pi pi-chart-bar',
      link: '/reports',
    },
    {
      number: '3',
      name: 'Lançamentos',
      icon: 'pi pi-dollar',
      link: '/entries',
    },
    {
      number: '4',
      name: 'Categorias',
      icon: 'pi pi-building',
      link: '/categories',
    },
  ];
}
