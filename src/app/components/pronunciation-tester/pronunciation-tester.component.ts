
import { Component, OnInit } from '@angular/core';
import { IPronunciationInfo } from 'src/app/model/pronunciationInfo.model';

@Component({
  selector: 'app-pronunciation-tester',
  templateUrl: './pronunciation-tester.component.html',
  styleUrls: ['./pronunciation-tester.component.scss']
})

export class PronunciationTesterComponent implements OnInit {
  public whatToSay: IPronunciationInfo;
  public whatIsHeard: IPronunciationInfo;
  constructor() { }
  ngOnInit(): void {
    this.whatToSay = {
      term: '你好',
      transliteration: '',
      translation: 'hello',
      language: 'zh-CN',
      voice: 'zh-CN-Kangkang-Apollo'
    };
    this.whatIsHeard = {};
  }
}
