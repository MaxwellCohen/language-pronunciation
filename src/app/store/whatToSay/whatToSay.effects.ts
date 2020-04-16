import { LanguageService } from 'src/app/services/language.service';
import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { manualyAddItem, translateAdd } from './whatToSay.actions';
import { map, mergeMap } from 'rxjs/operators';


@Injectable()
export class WhatToSayEffects {

  constructor(
    private actions$: Actions,
    private languageService: LanguageService
  ) { }

  @Effect()
  loadWord$ = this.actions$.pipe(
    ofType(translateAdd.type),
    mergeMap((payload) => {
      console.log();
      return this.languageService.translation(payload).pipe(
        map(translation => (manualyAddItem({
          text: translation.translation,
          transliteration: translation.translationTransliteration,
          translation: translation.text}))));
    }
    ));
}
