import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundRecordComponent } from './sound-record.component';

describe('SoundRecordComponent', () => {
  let component: SoundRecordComponent;
  let fixture: ComponentFixture<SoundRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoundRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
