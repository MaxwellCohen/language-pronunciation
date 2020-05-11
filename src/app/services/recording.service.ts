
import { Injectable } from '@angular/core';
import * as RecordingActions from 'src/app/store/sounds/sounds.actions';
import { Store } from '@ngrx/store';
import { IState } from '../model/pronunciationInfo.model';
import { MircosoftSpeechService } from './mircosoft-speech.service';
import * as whatIsHeard from 'src/app/store/whatIsHeard/whatIsHeard.actions';

@Injectable({
  providedIn: 'root'
})
export class RecordingService {
  private AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  private gumStream; // stream from getUserMedia()
  private rec; // Recorder.js object
  private input; // MediaStreamAudioSourceNode we'll be recording
  private recording = false;

  constructor(
    private store: Store<IState>,
    private mss: MircosoftSpeechService,
  ) { }


  startRecording() {
    if (!this.recording) {
      this.recording = true;
      this.store.dispatch(whatIsHeard.manualyAddItem({text: 'Recording...'}));
      this.startLocalRecording();
    }
  }

  stopRecording() {
    this.recording = false;
    this.stopLocalRecording();
  }



  startLocalRecording() {
    const constraints = { audio: true, video: false };
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      this.AudioContext = new AudioContext();
      this.gumStream = stream;
      this.input = this.AudioContext.createMediaStreamSource(stream);
      // @ts-ignore
      this.rec = new Recorder(this.input, { numChannels: 1 });
      // start the recording process
      this.rec.record();
    }).catch(() => {
      this.store.dispatch(RecordingActions.hasError());
      this.store.dispatch(RecordingActions.stopRecording());
    });
  }


  stopLocalRecording() {
    if (!this.rec) {
      return null;
    }
    // tell the recorder to stop the recording
    this.rec.stop();
    // stop microphone access
    this.gumStream.getAudioTracks()[0].stop();
    // create the wav blob and pass it on to createDownloadLink
    this.store.dispatch(whatIsHeard.manualyAddItem({text: 'Analyzing...'}));
    this.rec.exportWAV((blob) => {
      const url = URL.createObjectURL(blob);
      this.mss.sttFromBlob(blob);
      this.store.dispatch(RecordingActions.clearRecording());
      this.store.dispatch(RecordingActions.addSoundURL({url}));
    });

    this.rec = null;
  }

  clearSoundRecording(url) {
    URL.revokeObjectURL(url);
  }
}

