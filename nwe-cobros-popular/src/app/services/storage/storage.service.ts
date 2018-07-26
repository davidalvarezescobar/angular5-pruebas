import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }

  setLocalItem(keyName: string, value: Object) {
    localStorage.setItem(keyName, JSON.stringify(value));
  };

  getLocalItem(keyName: string) {
    return localStorage.getItem(keyName) !== 'undefined' ?
           JSON.parse(localStorage.getItem(keyName))     :
           undefined;
  };

  setSessionItem(keyName: string, value: Object) {
    sessionStorage.setItem(keyName, JSON.stringify(value));
  };

  updateSessionItem(keyName: string, value: Object) {
    const sessionItem = this.getSessionItem(keyName);
    const newSessionItem = Object.assign({}, sessionItem, value);
    this.setSessionItem(keyName, newSessionItem);
  };

  getSessionItem (keyName: string){
    return sessionStorage.getItem(keyName) !== 'undefined' ?
           JSON.parse(sessionStorage.getItem(keyName)) :
           undefined;
  };

  delSessionItem (keyName: string) {
    sessionStorage.getItem(keyName) ? sessionStorage.removeItem(keyName) : false;
  };

  clearSession(keysToKeep: Array<string>) {
    const keysToKeepWithValue = [];
    let keyToKeppWithValue = {};

    for (let x = 0; x < keysToKeep.length; x++) {
      keyToKeppWithValue = {
        key: keysToKeep[x],
        value: sessionStorage.getItem(keysToKeep[x])
      };
      keysToKeepWithValue.push(keyToKeppWithValue);
    }

    sessionStorage.clear();
    for (let y = 0; y < keysToKeepWithValue.length; y++) {
      sessionStorage.setItem(keysToKeepWithValue[y].key, keysToKeepWithValue[y].value);
    }
  };

}
