import { CommonConstants } from './../../config/constants';
import { StorageService } from './../storage/storage.service';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable()
export class UserService {

  private PATH_ME = '/v1/user/me';

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  public getMe(uri: string): Observable<any> {
    return this.http.get(uri + this.PATH_ME, {observe: 'response'});
  }

  public storeUser(user) {
    this.storageService.setSessionItem(CommonConstants.KEY_USER, user);
  }

  get user(): User {
    return this.storageService.getSessionItem(CommonConstants.KEY_USER);
  }

}
