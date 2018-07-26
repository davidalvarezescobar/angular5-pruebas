import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { TranslateService } from 'ng2-translate';

import { Environment } from './config';
import { ErrorSetupConfig } from './error/ErrorSetupConfig';
import { ErrorSetupUser } from './error/ErrorSetupUser';

import { StorageService } from './../../services/storage/storage.service';
import { UserService } from './../../services/user/user.service';
import { CommonConstants } from './../constants';

@Injectable()
export class SetupService {

  KEY_CONFIG = CommonConstants.NWE + '_' + Environment.functionality + '_' + CommonConstants.KEY_CONFIG;

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private userService: UserService,
    private translateService: TranslateService
  ) { }

  public init(): Promise<any> {
    return this.execute();
  }

  private execute(): Promise<any> {
    this.initLanguage();
    let waitPromise = new Promise((resolve, reject) => {
      let config = this.storageService.getSessionItem(this.KEY_CONFIG);
      if (config && config.activeLaunch) {
        const alias = this.getUrlParameter('xAlias');
        config.user = alias ? alias : config.user;
        this.saveConfig(config);
      }
      if (config === null) {
        this.getConfig(resolve, reject);
      } else {
        Environment.setConfig(config);
        this.doUserMe(resolve, reject);
      }
    });
    return waitPromise;
  }

  private getConfig(resolve: any, reject: any) {
    let uri = window.location.origin + window.location.pathname + CommonConstants.FILE_CONFIG;
    return this.http.get(uri)
      .map(response => {
        this.saveConfig(response);
      }).subscribe(response => {
        this.doUserMe(resolve, reject);
      }, error => {
        reject(new ErrorSetupConfig());
      });
  }

  private doUserMe(resolve: any, reject: any): void {
    this.getUserMe().subscribe((response) => {
      this.storeHeaders(response.headers);
      this.userService.storeUser(response.body);
      this.translateService.use(CommonConstants.DEFAULT_LANGUAGE).subscribe(() => {
        resolve();
      }, (error) => {
        reject(new ErrorSetupUser(error));
      });
    }, error => {
      reject(new ErrorSetupUser(error));
    });
  }

  private getUserMe() {
    return this.userService
      .getMe(Environment.config.apiRestDomain + Environment.config.nweCmcContractApi);
  }

  private saveConfig(config: any) {
    if(!config.otpProducts) {
      config['otpProducts'] = [];
    }
    Environment.setConfig(config);
    this.storageService.setSessionItem(this.KEY_CONFIG, config);
  }

  private storeHeaders(headers: HttpHeaders): void {
    let language: string = headers.get(CommonConstants.HEADER_LANGUAGE);
    language = language ? language : CommonConstants.DEFAULT_LANGUAGE;

    if (Environment.config.activeLaunch) {
      language = this.getUrlParameter('xLang') ? this.getUrlParameter('xLang') : CommonConstants.DEFAULT_LANGUAGE;
    }

    sessionStorage.setItem(CommonConstants.KEY_LANGUAGE, language);
    sessionStorage.setItem(CommonConstants.KEY_SESSION, headers.get(CommonConstants.HEADER_SESSION));
  }

  private initLanguage() {
    sessionStorage.setItem(CommonConstants.KEY_LANGUAGE, CommonConstants.DEFAULT_LANGUAGE);
  }

  private getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(window.location.href);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

}
