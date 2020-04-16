import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {

  @Input() labelName: string;
  @Input() selectorData: any[] = [];
  @Input() selected: any;
  @Output() selectUpdate = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }


  onEventChange({value}) {
    this.selectUpdate.emit({value});
  }

}
