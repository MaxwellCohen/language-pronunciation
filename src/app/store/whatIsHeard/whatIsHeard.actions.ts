import { createAction, props } from '@ngrx/store';
import { IPronunciationInfo } from 'src/app/model/pronunciationInfo.model';


export const startRecording = createAction('[whatIsHeard] start Recording');
export const stopRecording = createAction('[whatIsHeard] stop Recording');

export const translateAdd = createAction('[whatIsHeard] translate Add', props<{text, from, to}>());
export const manualyAddItem = createAction('[whatIsHeard] manualyAddItem', props<Partial<IPronunciationInfo>>());
export const reset = createAction('[whatIsHeard] Reset');
