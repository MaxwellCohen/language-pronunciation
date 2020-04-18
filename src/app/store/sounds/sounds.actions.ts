import { createAction, props } from '@ngrx/store';


export const play = createAction('[sounds] play');
export const startRecording = createAction('[sounds] startRecording', props<{}>());
export const startRecordingSuccess = createAction('[sounds] startRecordingSuccess');
export const stopRecording = createAction('[sounds] stopRecording');
export const stopRecordingSuccess = createAction('[sounds] stopRecordingSuccess');
export const playTransliterationAndRecording = createAction('[sounds] playTransliterationAndRecording');
export const addSoundURL = createAction('[sounds] addSoundURL', props<{url: string}>());
export const removeSoundURL = createAction('[sounds] removeSoundURL');
export const removeSoundURLSuccess = createAction('[sounds] removeSoundURLSuccess');
export const hasError = createAction('[sounds] hasError');

