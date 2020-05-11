import { WhatToSayEffects } from './store/whatToSay/whatToSay.effects';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';

import { MatToolbarModule } from '@angular/material/toolbar';


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
import { EffectsModule } from '@ngrx/effects';
import { WhatIsHeardEffects } from './store/whatIsHeard/whatIsHeard.effects';
import { WordSelectorComponent } from './components/word-selector/word-selector.component';
import { soundsReducer } from './store/sounds/sounds.reducer';
import { SoundsEffects } from './store/sounds/sounds.effects';
import { APIInterceptor } from './services/apiInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    PronunciationTesterComponent,
    PronunciationInfoComponent,
    SoundRecordComponent,
    LanguageSettingsComponent,
    SelectorComponent,
    WordSelectorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatExpansionModule,
    StoreModule.forRoot({
      whatToSay: whatToSayReducer,
      language: languageReducer,
      whatIsHeard: whatisHeardReducer,
      sounds: soundsReducer
    }),
    EffectsModule.forRoot([WhatToSayEffects, WhatIsHeardEffects, SoundsEffects  ])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private mss: MircosoftSpeechService) {
    this.mss.init();
  }
}
