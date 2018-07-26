import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { CommonConstants } from './app/config/constants';
import { Environment } from './app/config/setup/config';
import { ErrorSetup } from './app/config/setup/error/ErrorSetup';
import { environment } from './environments/environment';

Environment.functionality = CommonConstants.FUNCIONALITY;

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch((err: ErrorSetup) => {
    err.showError();
  });
