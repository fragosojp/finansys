import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDatabase } from './in-memory-database';
//import { registerLocaleData } from '@angular/common';
//import ptBr from '@angular/common/locales/pt';
//registerLocaleData(ptBr);
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase),
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    /*{ provide: LOCALE_ID, useValue: 'pt-BR' }*/
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
