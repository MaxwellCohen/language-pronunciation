import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TtsService {

  constructor() { }

  readURL(text, lang, voice): string {
    return `/api/tts?text=${text}&lang=${lang}&voice=${voice}`;
  }
}
