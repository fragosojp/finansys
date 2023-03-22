import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-paga-header',
  templateUrl: './paga-header.component.html',
  styleUrls: ['./paga-header.component.css'],
})
export class PagaHeaderComponent {
  @Input('page-title') pageTitle?: string;
  @Input('button-class') buttonClass?: string;
  @Input('button-text') buttonText?: string;
  @Input('button-link') buttonLink?: string;
}
