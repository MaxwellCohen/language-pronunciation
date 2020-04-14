import { Component, Input } from '@angular/core';
import { IPronunciationInfo } from '../model/pronunciationInfo.model';
import { TtsService } from '../tts.service';

@Component({
  selector: 'app-pronunciation-info',
  templateUrl: './pronunciation-info.component.html',
  styleUrls: ['./pronunciation-info.component.scss']
})
export class PronunciationInfoComponent {
  @Input() pronunciationInfo: IPronunciationInfo;
  @Input() readOutLoud = false;
  constructor(private tts: TtsService) { }

  play() {
    const audio = new Audio();
    audio.src = this.tts.readURL(this.pronunciationInfo.term, this.pronunciationInfo.language, this.pronunciationInfo.voice);
    audio.currentTime = 0;
    audio.load();

    return audio.play();
  }
}



