import { ILanguageData } from 'src/app/model/pronunciationInfo.model';
import { createAction, props } from '@ngrx/store';

export const setSpeechLanguage = createAction('[laguage] setSpeechLanguage', props<{speechLanguageSTT: string}>());
export const setTranslationLanguage = createAction('[laguage] setTranslationLanguage', props<{userLanguage: string}>());
export const setVoice = createAction('[laguage] setVoice', props<{voice: string}>());
export const updateLanguage = createAction('[laguage] updateLanguage', props<Partial<ILanguageData>>());
export const reset = createAction('[laguage] Reset');
