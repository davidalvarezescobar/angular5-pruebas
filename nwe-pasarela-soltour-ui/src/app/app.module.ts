import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './services/http/interceptor';
import { PreloaderService } from './services/http/preloader.service';

// @nwe/core-ng
// import { CoreModule, SetupService } from '@nwe/core-ng';

// Setup/init
// import { InitService } from './services/init/init.service';
// import { InitFactory } from './services/init/init.factory';

// Internal modules
import { PagesModule } from './pages/pages.module';
import { CoreServiceModule } from './services/core.module';

// Bootstrap
import { AppComponent } from './app.component';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PagesModule,
    // CoreModule,
    CoreServiceModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    // SetupService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: InitFactory,
    //   deps: [SetupService],
    //   multi: true
    // },
    PreloaderService,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ]
})
export class AppModule { }
