import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { Store, select } from '@ngrx/store';
import { IState, ILanguageData } from 'src/app/model/pronunciationInfo.model';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { updateLanguage } from 'src/app/components/language.actions';
import * as whatToSayActions from 'src/app/store/whatToSay/whatToSay.actions';
import * as whatIsHeardActions from 'src/app/store/whatIsHeard/whatIsHeard.actions';


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
  public panelOpenState = false;

  constructor(private langService: LanguageService, private store: Store<IState>) {
    this.language$ = store.pipe(select('language'));
   }


  ngOnInit(): void {
    this.getLangData();
  }

  getLangData() {
    this.langService.getLanguageData()
      .pipe(take(1)).subscribe((data) => {
        this.langData = data;
        this.updateValuesfromStore();
    });
  }

  updateValuesfromStore() {
    this.language$.pipe(take(1)).subscribe((data: ILanguageData) => {
      this.langSelected = this.langData.find((el) => el.code === data.learningLanguage);
      if (this.langSelected) {
        this.voiceSelected = this.langSelected.voices.find((el) => el.code === data.voice);
      }
      this.userLanguageSelected = this.langData.find((el) => el.code === data.userLanguage);
    });
  }


  selectLearningLanguage({value}) {
    this.langSelected = value;
    this.store.dispatch(updateLanguage({learningLanguage: value.code}));
    this.store.dispatch(whatToSayActions.reset());
    this.store.dispatch(whatIsHeardActions.reset());
  }

  selectVoice({value}) {
    this.voiceSelected = value;
    this.store.dispatch(updateLanguage({voice: value.code}));
  }

  selectUserLanguage({value}) {
    this.userLanguageSelected = value;
    this.store.dispatch(updateLanguage({userLanguage: value.code}));
  }
}
