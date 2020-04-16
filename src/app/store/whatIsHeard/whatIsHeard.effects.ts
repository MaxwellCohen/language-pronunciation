import { LanguageService } from 'src/app/services/language.service';
import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as whatIsHeardActions from './whatIsHeard.actions';
import { map, mergeMap } from 'rxjs/operators';


@Injectable()
export class WhatIsHeardEffects {

  constructor(
    private actions$: Actions,
    private languageService: LanguageService
  ) { }

  @Effect()
  loadWord$ = this.actions$.pipe(
    ofType(whatIsHeardActions.translateAdd.type),
    mergeMap((payload) => {
      console.log();
      return this.languageService.translation(payload).pipe(
        map(translation => {
          console.log(translation);
          return whatIsHeardActions.manualyAddItem({
            text: translation.text,
            transliteration: translation.textTransliteration,
            translation: translation.translation
          });
        }

        ));
    }
    ));
}
