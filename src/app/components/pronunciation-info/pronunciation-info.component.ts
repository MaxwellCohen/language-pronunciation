import { Component, Input } from '@angular/core';
import { IPronunciationInfo } from 'src/app/model/pronunciationInfo.model';



@Component({
  selector: 'app-pronunciation-info',
  templateUrl: './pronunciation-info.component.html',
  styleUrls: ['./pronunciation-info.component.scss']
})
export class PronunciationInfoComponent {
  @Input() pronunciationInfo: IPronunciationInfo;

  constructor() {}

}



