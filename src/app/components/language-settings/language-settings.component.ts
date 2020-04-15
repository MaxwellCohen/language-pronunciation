import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { Store, select } from '@ngrx/store';
import { IState, ILanguageData } from 'src/app/model/pronunciationInfo.model';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { updateLanguage } from 'src/app/store/language/language.actions';


@Component({
  selector: 'app-language-settings',
  templateUrl: './language-settings.component.html',
  styleUrls: ['./language-settings.component.scss']
})
export class LanguageSettingsComponent implements OnInit {
  public language$: Observable<ILanguageData>;
  public langData = null;
  public langSelected = null;
  public voiceSelected = null;
  public userLanguageSelected = null;

  constructor(private langService: LanguageService, private store: Store<IState>) {
    this.language$ = store.pipe(select('language'));
   }


  ngOnInit(): void {
    this.getLangData();
  }

  getLangData() {
    this.langService.getLanguageData()
      .pipe(take(1)).subscribe((data) => {
        console.log(data);
        this.langData = data;
        this.updateValuesfromStore();
    });
  }

  updateValuesfromStore() {
    this.language$.pipe(take(1)).subscribe((data: ILanguageData) => {
      this.langSelected = this.langData.find((el) => el.code === data.speechLanguageTTS);
      if (this.langSelected) {
        this.voiceSelected = this.langSelected.voices.find((el) => el.code === data.voice);
      }
      this.userLanguageSelected = this.langData.find((el) => el.code === data.userLanguage);

      console.log(this.userLanguageSelected, data);
    });
  }


  selectLanguage({value}) {
    this.langSelected = value;
    this.store.dispatch(updateLanguage({speechLanguageSTT: value.code}));
    console.log(value);
  }

  selectVoice({value}) {
    this.voiceSelected = value;
    this.store.dispatch(updateLanguage({speechLanguageTTS: value.locale, voice: value.code}));
    console.log(value);
  }

  selectUserLanguage({value}) {
    this.userLanguageSelected = value;
    this.store.dispatch(updateLanguage({userLanguage: value.code}));
    console.log(value);
  }
}
