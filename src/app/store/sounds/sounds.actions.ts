import { createAction, props } from '@ngrx/store';


export const play = createAction('[sounds] play');
export const startRecording = createAction('[sounds] startRecording');
export const startRecordingSuccess = createAction('[sounds] startRecordingSuccess');
export const stopRecording = createAction('[sounds] stopRecording');
export const stopRecordingSuccess = createAction('[sounds] stopRecordingSuccess');
export const playTransliterationAndRecording = createAction('[sounds] playTransliterationAndRecording');
export const addSoundURL = createAction('[sounds] addSoundURL', props<{url: string}>());
export const clearRecording = createAction('[sounds] clearRecording');
export const removeSoundURLSuccess = createAction('[sounds] removeSoundURLSuccess');
export const hasError = createAction('[sounds] hasError');

