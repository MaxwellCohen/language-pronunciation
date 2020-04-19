import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IState } from 'src/app/model/pronunciationInfo.model';
import { Subscription } from 'rxjs';
import * as whatToSayActions from 'src/app/store/whatToSay/whatToSay.actions';
import * as whatIsHeardActions from 'src/app/store/whatIsHeard/whatIsHeard.actions';
import * as soundActions from 'src/app/store/sounds/sounds.actions';


@Component({
  selector: 'app-word-selector',
  templateUrl: './word-selector.component.html',
  styleUrls: ['./word-selector.component.scss']
})
export class WordSelectorComponent implements OnInit, OnDestroy {
  public currentWord: string;
  public whatToSay$: Subscription;

  constructor(private store: Store<IState>) { }

  ngOnInit(): void {
    this.whatToSay$ = this.store.pipe(select('whatToSay')).subscribe((data) => {
      this.currentWord = data.translation;
    });
  }

  ngOnDestroy() {
    this.whatToSay$.unsubscribe();
  }

  update(text: string) {
    this.currentWord = text;
    this.store.dispatch(whatToSayActions.translateAdd({text}));
    this.store.dispatch(soundActions.clearRecording());
  }
}
