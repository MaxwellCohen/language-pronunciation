import { Injectable } from '@angular/core';
import { IState } from '../model/pronunciationInfo.model';
import { Store, select } from '@ngrx/store';
import { combineLatest, of, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TtsService {

  constructor(private store: Store<IState>, private http: HttpClient) { }

  readURL(text, voice): Observable<any> {
    if (text && voice) {
      const lang = voice.split('-').slice(0, 2).join('-');
      return this.http.get(`/api/tts?text=${text}&lang=${lang}&voice=${voice}`, {responseType: 'text'});
    }
    return of(null);
  }

  play() {
    return combineLatest([
      this.store.pipe(select('language')),
      this.store.pipe(select('whatToSay')),
      this.store.pipe(select('sounds'))
    ]).pipe(first()).subscribe(([language, whatToSay, sounds]) => {
      return this.readURL(whatToSay?.text, language?.voice).subscribe((url) => {
        const playlist = [
          url,
          sounds?.url
        ].filter(Boolean);
        this.playAudioArray(playlist);
      });
    });
  }


  playAudioArray(playlist: string[]) {
    if (!playlist.length) {
      return null;
    }

    let currentTrackIndex = 0;
    const delayBetweenTracks = 10;
    const audio = new Audio(playlist[currentTrackIndex]);
    audio.play();

    audio.addEventListener('ended', (e) => {
      setTimeout(() => {
        currentTrackIndex++;
        if (currentTrackIndex < playlist.length) {
          audio.src = playlist[currentTrackIndex];
          audio.play();
        }
      }, delayBetweenTracks);
    });

    return audio;
  }

}
