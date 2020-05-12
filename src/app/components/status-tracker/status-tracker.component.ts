import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IState } from 'src/app/model/pronunciationInfo.model';
import { Observable, combineLatest } from 'rxjs';
import { CleanDataService } from 'src/app/services/clean-data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-status-tracker',
  templateUrl: './status-tracker.component.html',
  styleUrls: ['./status-tracker.component.scss']
})
export class StatusTrackerComponent implements OnInit {

  public isRecording$: Observable<boolean>;
  public analyzing$: Observable<boolean>;
  public whatToSay$: Observable<string>;
  public whatIsHeard$: Observable<string>;
  public overall$: Observable<string>;

  constructor(private store: Store<IState>, cleanData: CleanDataService) {
    this.isRecording$ = this.store.pipe(select('sounds', 'isRecording'));
    this.whatToSay$ = this.store.pipe(select('whatToSay', 'text'), map(cleanData.removePunctuation));
    this.whatIsHeard$ = this.store.pipe(select('whatIsHeard', 'text'), map(cleanData.removePunctuation));
    this.analyzing$ = this.store.pipe(select('whatIsHeard', 'analyzing'));
    this.overall$ = combineLatest([this.isRecording$, this.whatToSay$, this.whatIsHeard$, this.analyzing$])
    .pipe(map(([isRecording, whatToSay, whatIsHeard, analyzing]) => {
      if (isRecording) {
        return 'Recording';
      }
      if (analyzing) {
        return 'Analyzing';
      }

      if (!whatIsHeard || !whatToSay)  {
        return 'Please speak';
      }

      if (whatToSay === whatIsHeard) {
        return 'Good Job!!!';
      } else {
        return 'Try again';
      }
    }));
   }

  ngOnInit(): void {
  }

}
