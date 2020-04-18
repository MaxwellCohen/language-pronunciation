import { ISoundsData } from './../../model/pronunciationInfo.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IState } from 'src/app/model/pronunciationInfo.model';
import { Subscription } from 'rxjs';
import * as soundActions from 'src/app/store/sounds/sounds.actions';


const RECORD_TEXT = 'Record';
const STOP_TEXT = 'Stop';

@Component({
  selector: 'app-sound-record',
  templateUrl: './sound-record.component.html',
  styleUrls: ['./sound-record.component.scss']
})
export class SoundRecordComponent implements OnInit, OnDestroy {

  public AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  public error = false;
  public recordButtonText = RECORD_TEXT;

  public recordingURL;
  public sounds$: Subscription;
  private isRecording: boolean;

  constructor(private store: Store<IState>) {
  }

  ngOnInit() {
    this.sounds$ = this.store.pipe(select('sounds')).subscribe((data: ISoundsData) => {
      this.isRecording = data.isRecording;
      this.recordButtonText = this.isRecording ? STOP_TEXT : RECORD_TEXT;
      this.recordingURL = data.url;
    });
  }

  ngOnDestroy() {
    this.sounds$.unsubscribe();
  }

  toggleRecordingStatus() {
    if (this.isRecording) {
      this.store.dispatch(soundActions.stopRecording());
    } else {
      this.store.dispatch(soundActions.startRecording({}));
    }
  }

  clearSoundRecording() {
    this.store.dispatch(soundActions.removeSoundURL());
  }

  play() {
    const audio = new Audio();
    audio.src = this.recordingURL;
    audio.currentTime = 0;
    audio.load();
    return audio.play();
  }




}
