import { LanguageService } from 'src/app/services/language.service';
import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { manualyAddItem, translateAdd } from './whatToSay.actions';
import { map, mergeMap, first } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { IState, ITranslation } from 'src/app/model/pronunciationInfo.model';


@Injectable()
export class WhatToSayEffects {

  constructor(
    private actions$: Actions,
    private store: Store<IState>,
    private languageService: LanguageService
  ) { }

  @Effect()
  loadWord$ = this.actions$.pipe(
    ofType(translateAdd.type),
    mergeMap((payload: { text }) => {
      return this.store.pipe(
        select('language'),
        first(),
        map(language => ({ ...payload, to: language.learningLanguage, from: language.userLanguage }))
      );
    }),
    mergeMap((payload) => {
      return this.languageService.translation(payload).pipe(
        map((translation: ITranslation) => (manualyAddItem({
          text: translation?.translation ?? '',
          transliteration: translation?.translationTransliteration ?? '',
          translation: translation?.text ?? ''
        }))));
    }
    ));
}
