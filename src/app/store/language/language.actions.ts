import { createAction, props } from '@ngrx/store';

export const setSpeechLanguage = createAction('[laguage] setSpeechLanguage', props<{slang: string}>());
export const setTranslationLanguage = createAction('[laguage] setTranslationLanguage', props<{tlang: string}>());
export const setVoice = createAction('[laguage] setVoice', props<{voice: string}>());
export const reset = createAction('[laguage] Reset');
