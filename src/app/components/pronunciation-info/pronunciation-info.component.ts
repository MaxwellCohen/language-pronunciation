import { ILanguageData } from './../../model/pronunciationInfo.model';
import { Component, Input } from '@angular/core';
import { IPronunciationInfo } from 'src/app/model/pronunciationInfo.model';
import { TtsService } from 'src/app/services/tts.service';



@Component({
  selector: 'app-pronunciation-info',
  templateUrl: './pronunciation-info.component.html',
  styleUrls: ['./pronunciation-info.component.scss']
})
export class PronunciationInfoComponent {
  @Input() pronunciationInfo: IPronunciationInfo;
  @Input() readOutLoud = false;
  @Input() language: ILanguageData;
  constructor(private tts: TtsService) { }

  play() {
    const audio = new Audio();
    audio.src = this.tts.readURL(this.pronunciationInfo.term, this.language.slang, this.language.voice);
    audio.currentTime = 0;
    audio.load();

    return audio.play();
  }
}



