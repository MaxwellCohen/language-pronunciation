import { ILanguageData, IState } from './../../model/pronunciationInfo.model';
import { Component, OnInit } from '@angular/core';
import { IPronunciationInfo } from 'src/app/model/pronunciationInfo.model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as whatToSayActions from 'src/app/store/whatToSay/whatToSay.actions';


@Component({
  selector: 'app-pronunciation-tester',
  templateUrl: './pronunciation-tester.component.html',
  styleUrls: ['./pronunciation-tester.component.scss']
})

export class PronunciationTesterComponent implements OnInit {
  public whatToSay$: Observable<IPronunciationInfo>;
  public whatIsHeard$: Observable<IPronunciationInfo>;
  public language$: Observable<ILanguageData>;
  public whatIsHeard: IPronunciationInfo;

  constructor(private store: Store<IState>) {
    this.whatToSay$ = store.pipe(select('whatToSay'));
    this.whatIsHeard$ = store.pipe(select('whatIsHeard'));
    this.language$ = store.pipe(select('language'));
  }

  ngOnInit(): void {
    this.language$.subscribe(() => {
      this.store.dispatch(whatToSayActions.translateAdd({text: 'hello'}));
    });
  }

  wordUpdate(text) {
    this.store.dispatch(whatToSayActions.translatedAdd({text}));
  }

}
