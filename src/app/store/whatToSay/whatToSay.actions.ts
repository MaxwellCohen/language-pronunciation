import { createAction, props } from '@ngrx/store';
import { IPronunciationInfo } from 'src/app/model/pronunciationInfo.model';


export const translateAdd = createAction('[WhatToSay] translate Add', props<{text, from, to}>());
export const manualyAddItem = createAction('[WhatToSay] manualyAddItem', props<IPronunciationInfo>());
export const reset = createAction('[WhatToSay] Reset');
