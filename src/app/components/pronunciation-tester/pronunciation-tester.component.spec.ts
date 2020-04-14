import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PronunciationTesterComponent } from './pronunciation-tester.component';

describe('PronunciationTesterComponent', () => {
  let component: PronunciationTesterComponent;
  let fixture: ComponentFixture<PronunciationTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PronunciationTesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PronunciationTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
