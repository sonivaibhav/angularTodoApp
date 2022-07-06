import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  //JSON.parse allows to turn data from Object Notation string to an Array
  public getItem(key: string): any {
    const item = localStorage.getItem(key);
    if (item) {
      try {
        return JSON.parse(item);
      } catch (e) {
        console.debug(`Error trying to parse item from local storage: ${e}`);
      }
    }
    return null;
  }

  //Converts Array to Object Notation string
  public setItem(key: string, value: any): void {
    /**
     * Running in try-catch because according to
     * https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem
     * "setItem() may throw an exception if the storage is full"
     */
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.debug(`Error encountered when trying to save to local storage: ${e}`)
    }
  }
}
