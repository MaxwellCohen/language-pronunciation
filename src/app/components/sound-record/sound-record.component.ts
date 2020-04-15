import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MircosoftSpeechService } from 'src/app/services/mircosoft-speech.service';
import * as whatIsHeard from 'src/app/store/whatIsHeard/whatIsHeard.actions';
import { Store } from '@ngrx/store';
import { IState } from 'src/app/model/pronunciationInfo.model';


const RECORD_TEXT = 'Record';
const STOP_TEXT = 'Stop';

@Component({
  selector: 'app-sound-record',
  templateUrl: './sound-record.component.html',
  styleUrls: ['./sound-record.component.scss']
})
export class SoundRecordComponent implements OnInit {

  // @ViewChild('audio', { static: true }) public audio: ElementRef;
  public AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  public error = false;
  public recordButtonText = RECORD_TEXT;


  public gumStream; // stream from getUserMedia()
  public rec; // Recorder.js object
  public input; // MediaStreamAudioSourceNode we'll be recording
  public recordingURL;

  constructor(private sanitizer: DomSanitizer,
              private mss: MircosoftSpeechService,
              private store: Store<IState>) {}

  ngOnInit() {
    this.AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  }


  toggleRecordingStatus() {
    if ( this.recordButtonText === RECORD_TEXT) {
      this.startRecording();
    } else {
      this.stopRecording();
    }
  }

  startRecording() {
    console.log('recordButton clicked');
    this.startLocalRecording();
    this.mss.startTranslation('zh-CN', 'en-US');
  }



  stopRecording() {
    console.log('stopButton clicked');
    this.stopLocalRecording();
    this.mss.stopTranslation();

  }


  stopLocalRecording() {
    // disable the stop button, enable the record too allow for new recordings
    this.recordButtonText = RECORD_TEXT;

    // tell the recorder to stop the recording
    this.rec.stop();

    // stop microphone access
    this.gumStream.getAudioTracks()[0].stop();

    // create the wav blob and pass it on to createDownloadLink
    this.rec.exportWAV(this.createDownloadLink.bind(this));
  }

  sanitize(url: string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  createDownloadLink(blob) {
    this.clearSoundRecording();
    this.recordingURL = URL.createObjectURL(blob);
  }

  clearSoundRecording() {
    if (this.recordingURL ) {
      URL.revokeObjectURL(this.recordingURL);
      this.store.dispatch(whatIsHeard.reset());
    }
    this.recordingURL = '';
  }

  play() {
    const audio = new Audio();
    audio.src = this.recordingURL;
    audio.currentTime = 0;
    audio.load();
    return audio.play();
  }


  startLocalRecording() {
    const constraints = { audio: true, video: false };
    this.error = false;
    this.recordButtonText = STOP_TEXT;

    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      console.log('getUserMedia() success, stream created, initializing Recorder.js ...');
      this.AudioContext = new AudioContext();

      // update the format
      console.log('Format: 1 channel pcm @ ' + this.AudioContext.sampleRate / 1000 + 'kHz');

      /*  assign to gumStream for later use  */
      this.gumStream = stream;

      /* use the stream */
      this.input = this.AudioContext.createMediaStreamSource(stream);

      /*
        Create the Recorder object and configure to record mono sound (1 channel)
        Recording 2 channels  will double the file size
      */
      // @ts-ignore
      this.rec = new Recorder(this.input, { numChannels: 2 });

      // start the recording process
      this.rec.record();

      console.log('Recording started');

    }).catch(() => {
      // enable the record button if getUserMedia() fails
      this.recordButtonText = RECORD_TEXT;
      this.error = true;
    });
  }


}
