import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TtsService {

  constructor() { }

  readURL(text, voice): string {
    const lang = voice.split('-').slice(0, 2).join('-');
    return `/api/tts?text=${text}&lang=${lang}&voice=${voice}`;
  }
}
