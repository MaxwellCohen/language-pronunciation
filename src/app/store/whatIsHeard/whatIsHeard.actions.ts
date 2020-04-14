import { createAction, props } from '@ngrx/store';
import { IPronunciationInfo } from 'src/app/model/pronunciationInfo.model';


export const manualyAddItem = createAction('[whatIsHeard] manualyAddItem', props<IPronunciationInfo>());
export const reset = createAction('[whatIsHeard] Reset');
