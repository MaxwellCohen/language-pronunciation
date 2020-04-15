import { Injectable } from '@angular/core';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { HttpClient } from '@angular/common/http';
import { IState } from '../model/pronunciationInfo.model';
import { Store } from '@ngrx/store';
import * as whatIsHeard from 'src/app/store/whatIsHeard/whatIsHeard.actions';
import { SpeechConfig } from 'microsoft-cognitiveservices-speech-sdk';


@Injectable({
  providedIn: 'root'
})
export class MircosoftSpeechService {

  private token;
  private reco;

  constructor(private http: HttpClient, private store: Store<IState>) { }

  init() {
    return this.http.get('api/token').subscribe((v: any) => {
      this.token = v && v.token;
      return v;
    });
  }


  startTranslation(slang, tLang) {
    this.store.dispatch(whatIsHeard.reset());
    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    const speechConfig = sdk.SpeechTranslationConfig.fromAuthorizationToken(this.token, 'eastus');
    speechConfig.speechRecognitionLanguage = slang;
    speechConfig.addTargetLanguage(tLang);
    this.reco = new sdk.TranslationRecognizer(speechConfig, audioConfig);
    this.reco.recognized = (s, e) => {
      console.log(e);
      const language = tLang.substring(0, 2);
      const term = e.result.text;
      const translation = e.result.translations.get(language);
      this.store.dispatch(whatIsHeard.manualyAddItem({term, translation}));
    };
    this.reco.startContinuousRecognitionAsync();
  }

  stopTranslation() {
    const close = () => {
      this.reco.close();
      this.reco = undefined;
    };
    if (this.reco) {
      this.reco.stopContinuousRecognitionAsync(close, close);
    }
  }


}
