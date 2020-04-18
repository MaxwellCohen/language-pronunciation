import * as Actions from './sounds.actions';
import { createReducer, on } from '@ngrx/store';

export const initialState = {
  error: false,
  isRecording: false,
  url: ''
};

const reducer = createReducer(initialState,
  on(Actions.hasError, (state) => ({
    ...state,
    error: true
  })),
  on(Actions.startRecording, (state) => ({
    ...state,
    isRecording: true
  })),
  on(Actions.stopRecording, (state) => ({
    ...state,
    isRecording: false
  })),
  on(Actions.addSoundURL, (state, {url}) => ({
    ...state,
    url
  })),
  on(Actions.removeSoundURLSuccess, (state) => ({
    ...state,
    url: ''
  })),
);

export function soundsReducer(state, action) {
  return reducer(state, action);
}
