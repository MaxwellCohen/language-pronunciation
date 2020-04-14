import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PronunciationInfoComponent } from './pronunciation-info.component';

describe('PronunciationInfoComponent', () => {
  let component: PronunciationInfoComponent;
  let fixture: ComponentFixture<PronunciationInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PronunciationInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PronunciationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
