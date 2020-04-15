import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private http: HttpClient) { }

  getLanguageData() {
    return this.http.get('/api/languageSuportData');
  }


  transliterate({text, language, fromScript, toScript}) {
    const URL = '/api/translaterate' + this.encodeQueryPrams({text, language, fromScript, toScript});
    return this.http.get(URL);
  }


  encodeQueryPrams(obj: object) {
    const queryPramsArray = [];

    for (const [prop, value] of Object.entries(obj)) {
      queryPramsArray.push( prop + '=' + encodeURI(value));
    }

    return queryPramsArray.join('&');

  }
}
