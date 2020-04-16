import { createReducer, on } from '@ngrx/store';
import * as Actions from './language.actions';
import { ILanguageData } from 'src/app/model/pronunciationInfo.model';


export const initialState: ILanguageData = {
  userLanguage: 'en',
  learningLanguage: 'zh-Hans',
  voice: 'zh-CN-Kangkang-Apollo'
};

const reducer = createReducer(initialState,
  on(Actions.setSpeechLanguage , (state, { speechLanguageSTT }) => ({
    ...state,
    speechLanguageSTT
  })),
  on(Actions.setTranslationLanguage , (state, { userLanguage }) => ({
    ...state,
    userLanguage
  })),
  on(Actions.setVoice , (state, { voice }) => ({
    ...state,
    voice
  })),

  on(Actions.updateLanguage, (state, newvals) => ({
    ...state,
    ...newvals
  })),

  on(Actions.reset, state => (initialState)),
);

export function languageReducer(state, action) {
  return reducer(state, action);
}
