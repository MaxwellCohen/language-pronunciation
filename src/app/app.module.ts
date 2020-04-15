import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';

import { MatToolbarModule } from '@angular/material/toolbar';

import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { StoreModule } from '@ngrx/store';

import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PronunciationTesterComponent } from './components/pronunciation-tester/pronunciation-tester.component';
import { PronunciationInfoComponent } from './components/pronunciation-info/pronunciation-info.component';
import { SoundRecordComponent } from './components/sound-record/sound-record.component';
import { whatToSayReducer } from './store/whatToSay/whatToSay.reducer';
import { languageReducer } from './store/language/language.reducer';
import { whatisHeardReducer } from './store/whatIsHeard/whatIsHeard.reducer';
import { MircosoftSpeechService } from './services/mircosoft-speech.service';
import { LanguageSettingsComponent } from './components/language-settings/language-settings.component';
import { SelectorComponent } from './components/selector/selector.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    PronunciationTesterComponent,
    PronunciationInfoComponent,
    SoundRecordComponent,
    LanguageSettingsComponent,
    SelectorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    StoreModule.forRoot({
      whatToSay: whatToSayReducer,
      language: languageReducer,
      whatIsHeard: whatisHeardReducer
    })
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private mss: MircosoftSpeechService) {
    this.mss.init();
  }
}
