import { Injectable } from '@angular/core';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MircosoftSpeechService {

  private token;
  private reco;

  constructor(private http: HttpClient) {
    this.getToken();
  }

  getToken() {
    if (!this.token) {
      return this.http.get('api/token').subscribe((v: any) => {
        this.token = v && v.token;
        return v;
      });
    }
    return of(this.token);
  }


  startTranslation(slang, tLang) {
    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    const speechConfig = sdk.SpeechTranslationConfig.fromAuthorizationToken(this.token, 'eastus');
    speechConfig.speechRecognitionLanguage = slang;
    speechConfig.addTargetLanguage(tLang);
    this.reco = new sdk.TranslationRecognizer(speechConfig, audioConfig);
    this.reco.recognized = (s, e) => {
      console.log(e);
      const language = tLang.substring(0, 2);
      const text = e.result.text;
      const translation = e.result.translations.get(language);
    };

    const logger = (s, e) => console.log(s, e);
    // Signals that a new session has started with the speech service
    this.reco.sessionStarted = logger;
    // Signals the end of a session with the speech service.
    this.reco.sessionStopped = logger;
    // Signals that the speech service has started to detect speech.
    this.reco.speechStartDetected = logger;
    // Signals that the speech service has detected that speech has stopped.
    this.reco.speechEndDetected = logger;

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
