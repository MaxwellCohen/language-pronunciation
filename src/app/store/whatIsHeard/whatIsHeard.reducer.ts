import { createReducer, on } from '@ngrx/store';
import { reset, manualyAddItem } from './whatIsHeard.actions';
import { IPronunciationInfo } from 'src/app/model/pronunciationInfo.model';


export const initialState: IPronunciationInfo = {
  term: '',
  transliteration: '',
  translation: '',
};

const reducer = createReducer(initialState,
  on(manualyAddItem, (state, {term, transliteration, translation }) => ({
    ...state,
    term: term || state.term,
    transliteration: transliteration || state.transliteration,
    translation: translation || state.translation
  })),
  on(reset, state => ({
    term: '',
    transliteration: '',
    translation: '',
  })),
);

export function whatisHeardReducer(state, action) {
  return reducer(state, action);
}
