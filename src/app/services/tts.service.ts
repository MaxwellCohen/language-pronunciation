import { Injectable } from '@angular/core';
import { IState } from '../model/pronunciationInfo.model';
import { Store, select } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TtsService {

  constructor(private store: Store<IState>) { }

  readURL(text, voice): string {
    if (text && voice) {
      const lang = voice.split('-').slice(0, 2).join('-');
      return `/api/tts?text=${text}&lang=${lang}&voice=${voice}`;
    }
    return null;
  }

  play() {
    return combineLatest([
      this.store.pipe(select('language')),
      this.store.pipe(select('whatToSay')),
      this.store.pipe(select('sounds'))
    ]).pipe(first()).subscribe(([language, whatToSay, sounds]) => {
      const playlist = [
        this.readURL(whatToSay?.text, language?.voice),
        sounds?.url
      ].filter(Boolean);

      this.playAudioArray(playlist);
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
