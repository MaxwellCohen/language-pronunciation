import { Injectable } from '@angular/core';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { HttpClient } from '@angular/common/http';
import { IState, ILanguageData } from '../model/pronunciationInfo.model';
import { Store, select } from '@ngrx/store';
import * as whatIsHeard from 'src/app/store/whatIsHeard/whatIsHeard.actions';
import { SpeechConfig } from 'microsoft-cognitiveservices-speech-sdk';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MircosoftSpeechService {

  private token;
  private reco;
  public language$: Observable<ILanguageData>;

  constructor(private http: HttpClient, private store: Store<IState>) {
    this.language$ = store.pipe(select('language'));
   }

  init() {
    return this.http.get('api/token').subscribe((v: any) => {
      this.token = v && v.token;
      return v;
    });
  }


  startTranslation() {
    let to;
    let from;
    let voice;
    this.store.dispatch(whatIsHeard.reset());
    this.language$.pipe(take(1)).subscribe((data) => {
      to = data.userLanguage;
      from = data.learningLanguage;
      voice = data.voice;
    });

    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    const speechConfig = sdk.SpeechConfig.fromAuthorizationToken(this.token, 'eastus');
    speechConfig.speechRecognitionLanguage = voice.split('-').slice(0, 2).join('-');
    this.reco = new sdk.SpeechRecognizer(speechConfig, audioConfig);
    this.reco.recognized = (s, e) => {
      const text = e.result.text;
      if (text) {
          console.log({text, to, from });
          this.store.dispatch(whatIsHeard.translateAdd({text, to, from }));
      }
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
