import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IPronunciationInfo } from 'src/app/model/pronunciationInfo.model';



@Component({
  selector: 'app-pronunciation-info',
  templateUrl: './pronunciation-info.component.html',
  styleUrls: ['./pronunciation-info.component.scss']
})
export class PronunciationInfoComponent {
  @Input() pronunciationInfo: IPronunciationInfo;
  @Input() readonly = false;
  @Output() wordUpdate = new EventEmitter();
  constructor() {}

  update(value) {
    this.wordUpdate.emit(value);
  }

}



