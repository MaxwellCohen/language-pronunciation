import { createReducer, on } from '@ngrx/store';
import { reset, manualyAddItem } from './whatToSay.actions';
import { IPronunciationInfo } from 'src/app/model/pronunciationInfo.model';


export const initialState: IPronunciationInfo = {
  text: '',
};

const reducer = createReducer(initialState,
  on(manualyAddItem, (state, value) => ({
    ...state,
    ...value,
  })),
  on(reset, state => ({
    text: '',
    transliteration: '',
    translation: '',
  })),
);

export function whatToSayReducer(state, action) {
  return reducer(state, action);
}
