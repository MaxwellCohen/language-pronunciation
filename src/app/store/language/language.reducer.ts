import { createReducer, on } from '@ngrx/store';
import * as Actions from './language.actions';
import { ILanguageData } from 'src/app/model/pronunciationInfo.model';


export const initialState: ILanguageData = {
  slang: 'zh-CN',
  tlang: 'en-US',
  voice: 'zh-CN-Kangkang-Apollo'
};

const reducer = createReducer(initialState,
  on(Actions.setSpeechLanguage , (state, { slang }) => ({
    ...state,
    slang
  })),
  on(Actions.setTranslationLanguage , (state, { tlang }) => ({
    ...state,
    tlang
  })),
  on(Actions.setVoice , (state, { voice }) => ({
    ...state,
    voice
  })),
  on(Actions.reset, state => (initialState)),
);

export function languageReducer(state, action) {
  return reducer(state, action);
}
