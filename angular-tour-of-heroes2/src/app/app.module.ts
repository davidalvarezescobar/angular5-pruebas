import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeroService } from './hero.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { NoopInterceptor } from './noop-interceptor';
import { delay } from 'rxjs/operators';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // InMemoryDataService es el nombre de la clase del Servicio 'in-memory-data.service'
    // el cual retorna un mock con un array de 'heroes'
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false, delay: 1000 }
    )
  ],
  providers: [
    HeroService,
    { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
