import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TranslateLoader } from 'ng2-translate';

import { Environment } from './../../config/setup/config';
import { CommonConstants } from './../../config/constants';
import { StorageService } from './../storage/storage.service';

@Injectable()
export class CustomLanguageLoader implements TranslateLoader {

  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {}

  getTranslation(lang: string): Observable<any> {
    let uri: string = Environment.config.apiRestDomain + Environment.config.nweConfigApi + CommonConstants.END_POINT_LANGUAGE;
    let language: string = sessionStorage.getItem(CommonConstants.KEY_LANGUAGE);
    let params: HttpParams = new HttpParams().set('languageCode', language);
    params = params.append('functionality', Environment.functionality);
    return this.httpClient.get(uri, {params});
  }

}
