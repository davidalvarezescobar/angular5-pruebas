import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from 'ng2-translate';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Internal modules
import { PagesModule } from './pages/pages.module';
import { CoreModule } from './services/core.module';

// Service
import { SetupService } from './config/setup/setup.service';
import { CustomLanguageLoader } from './services/translations/language.loader';
import { PreloaderService } from './services/http/preloader.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './services/http/interceptor';

// Bootstrap
import { AppComponent } from './app.component';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PagesModule,
    CoreModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useClass: CustomLanguageLoader
    })
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    SetupService,
    {
      provide: APP_INITIALIZER,
      useFactory: (setup: SetupService) => () => setup.init(),
      deps: [SetupService],
      multi: true
    },
    PreloaderService,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
