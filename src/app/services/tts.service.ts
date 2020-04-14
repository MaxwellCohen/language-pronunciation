import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TtsService {

  constructor(private http: HttpClient) { }

  readURL(text, lang, voice): string {
    return `/api/tts?text=${text}&lang=${lang}&voice=${voice}`;
  }
}
