import { Component, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges, SimpleChange, OnInit, OnDestroy } from '@angular/core';
import { IPronunciationInfo, ILanguageData, IState } from 'src/app/model/pronunciationInfo.model';
import { TtsService } from 'src/app/services/tts.service';
import { LanguageService } from 'src/app/services/language.service';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';



@Component({
  selector: 'app-pronunciation-info',
  templateUrl: './pronunciation-info.component.html',
  styleUrls: ['./pronunciation-info.component.scss']
})
export class PronunciationInfoComponent implements  OnInit, OnDestroy {
  @Input() pronunciationInfo: IPronunciationInfo;
  @Input() readOutLoud = false;
  public language$: Subscription;
  public languageInfo: ILanguageData;
  public transliteration;
  public translation;

  constructor(private tts: TtsService, private languageService: LanguageService, private store: Store<IState>) {
   }

   ngOnInit() {
    this.language$ = this.store.pipe(select('language')).subscribe((data: ILanguageData) => {
      this.languageInfo = data;
      // this.updateTranslation();
    });
  }
  ngOnDestroy() {
    this.language$.unsubscribe();
}

  // ngOnChanges(changes: SimpleChanges) {
  //   const currentItem: SimpleChange = changes.pronunciationInfo;

  //   if (currentItem?.currentValue){
  //     this.updateTranslation();
  //   }
  // }

  play() {
    const audio = new Audio();
    audio.src = this.tts.readURL(this?.pronunciationInfo?.text, this.languageInfo?.voice);
    audio.currentTime = 0;
    audio.load();

    return audio.play();
  }

  // updateTranslation() {
  //   const data = {
  //     text: this?.pronunciationInfo?.text,
  //     from: this?.languageInfo?.learningLanguage,
  //     to: this?.languageInfo?.userLanguage
  //   };
  //   this.languageService.translation(data).pipe(take(1)).subscribe((info) => {
  //     this.transliteration = info?.textTransliteration;
  //     this.translation = info?.translation;
  //   });
  // }

}



