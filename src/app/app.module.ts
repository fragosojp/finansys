import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, AppRoutingModule],
  providers: [
    /*{ provide: LOCALE_ID, useValue: 'pt-BR' }*/
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
