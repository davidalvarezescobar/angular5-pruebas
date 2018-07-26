import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators';
import 'rxjs/add/operator/map'



@Injectable()
export class AppService {

  constructor(private http: HttpClient) { }

  getListadoEventos(searchDesc?) {
    const url = 'http://180.106.132.72:8083/ANRGBA_RadarAisLP/public/rest/anrgba/admin/event/list';
    const params = {
      'searchReference': '01',
      'requestedListSize': '50',
      'eventDescription': searchDesc
    };
    return this.http.post(url, params)
      .map(result => result['eventlistItem']);
  }

  getListadoEventosByDesc(searchDesc) {
    return of(searchDesc).pipe(
      switchMap(searchDesc => this.getListadoEventos(searchDesc))
    );
  }

  getListadoPlanes() {
    const url = 'http://180.106.132.72:8083/ANRGBA_RadarAisLP/public/rest/anrgba/admin/plan/list';
    const params = {
      'searchReference': '01',
      'requestedListSize': '50',
      'planDescription':null
    };
    return this.http.post(url, params)
      .map(result => result['planlistItem']);
  }

  getCombosEvento() {
    const url = 'http://180.106.132.72:8083/ANRGBA_RadarAisLP/public/rest/anrgba/admin/masterlist';
    const params = {
      comboList: ['MO', 'PR', 'TIE', 'CLE']
    };
    return this.http.post(url, params)
      .map(result => {
        let arr = result['comboListResult'];
        console.log('Array original:', arr);
        let newResult = {};
        for(let {comboCode, comboListData} of arr) {
          newResult[comboCode] = comboListData;
        }
        console.log('Array convertido a objeto:', newResult);
        return newResult
      });
  }

  nuevoEvento(evento) {
    const url = 'http://180.106.132.72:8083/ANRGBA_RadarAisLP/public/rest/anrgba/admin/event/new';
    return this.http.post(url, evento);
  }
}
