import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { IState, ILanguageSupportData, ITranslation } from '../model/pronunciationInfo.model';
import { pluck, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  language$: any;

  constructor(private http: HttpClient, private store: Store<IState>) {
    this.language$ = store.pipe(select('language'));

  }

  getLanguageData(): Observable<ILanguageSupportData[]> {
    return this.http.get<ILanguageSupportData[]>('/api/languageSuportData');
  }


  transliteration({text, language, fromScript, toScript}) {
    const URL = '/api/translaterate?' + this.encodeQueryPrams({text, language, fromScript, toScript});
    return this.http.get(URL).pipe(pluck('transliteration'));
  }

  translation({text, from, to}) {
    const URL = '/api/translate?' + this.encodeQueryPrams({text, from, to});
    return this.http.get<ITranslation>(URL);
  }


  encodeQueryPrams(obj: object) {
    const queryPramsArray = [];
    for (const [prop, value] of Object.entries(obj)) {
      queryPramsArray.push( prop + '=' + encodeURI(value));
    }
    return queryPramsArray.join('&');

  }
}
