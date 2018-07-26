import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Environment } from './../../config/setup/config';

@Injectable()
export class ApiService {
  environment;
  constructor(private http: HttpClient) {
  }

  // Externals
  get(endPoint, params = {}): Observable<any> {
    const options = this.options(params);
    return this.http.get(
      Environment.config.apiRestDomain +
      Environment.config.nweCobrosApi +
      Environment.config.versionApi +
      endPoint,
      options
    );
  }

  getStringParams(endPoint, params = ''): Observable<any> {
    const options = new HttpParams({
      fromString: params
    });
    return this.http.get(
      Environment.config.apiRestDomain +
      Environment.config.nweCobrosApi +
      Environment.config.versionApi +
      endPoint,
      { params: options }
    );
  }

  post(endPoint, params = {}): Observable<any> {
    return this.http.post(endPoint, params);
  }

  put(endPoint, params = {}): Observable<any> {
    return this.http.put(
      Environment.config.apiRestDomain +
      Environment.config.nweCobrosApi +
      Environment.config.versionApi +
      endPoint,
      params
    );
  }

  delete(endPoint, params = {}): Observable<any> {
    return this.http.delete(endPoint + params);
  }

  // Internals
  // Build options
  public options(params) {
    const queryParams = (params !== '') ? this.addFilters(params) : params;
    const options = { params: queryParams };
    return options;
  }

  public optionsPdf(params) {
    const queryParams = (params !== '') ? this.addFilters(params) : params;
    const options =  { params: queryParams, responseType: 'blob' as 'blob' };
    return options;
  }



  private addFilters(params) {
    let filters = new HttpParams();
    for (const index in params) {
      if (params[index] !== '' && params[index] !== null) {
        filters = filters.append(index, params[index]);
      }
    }
    return filters;
  }


}
