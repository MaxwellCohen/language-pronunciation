import { RecordingService } from './../../services/recording.service';
import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { map, mergeMap, first, pluck, filter, tap, switchMap } from 'rxjs/operators';
import * as soundActions from './sounds.actions';
import * as whatIsHeard from './../whatIsHeard/whatIsHeard.actions';
import { Store, select } from '@ngrx/store';
import { IState } from 'src/app/model/pronunciationInfo.model';
import { of } from 'rxjs';


@Injectable()
export class SoundsEffects {

  constructor(
    private actions$: Actions,
    private store: Store<IState>,
    private recordingService: RecordingService
  ) { }

  @Effect()
  removeURL$ = this.actions$.pipe(
    ofType(soundActions.removeSoundURL.type),
    mergeMap(() => {
      return this.store.pipe(
        select('sounds'),
        first(),
        pluck('url'));
    }),
    filter((url) => !!url),
    switchMap((url) => {
      this.recordingService.clearSoundRecording(url);
      return [soundActions.removeSoundURLSuccess()];
    })
  );

  @Effect({dispatch: false})
  startRecording$ = this.actions$.pipe(
    ofType(soundActions.startRecording.type),
    switchMap(res => [
      res,
      whatIsHeard.reset(),
    ]),
    switchMap((res) => {
      return [res, this.recordingService.startRecording(), soundActions.startRecordingSuccess()];
    })
  );


  @Effect({dispatch: false})
  stopRecording$ = this.actions$.pipe(
    ofType(soundActions.stopRecording.type),
    switchMap(() => {
      this.recordingService.stopRecording();
      return [soundActions.stopRecordingSuccess()];
    })
  );

}
