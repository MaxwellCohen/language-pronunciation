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
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PronunciationTesterComponent } from './components/pronunciation-tester/pronunciation-tester.component';
import { PronunciationInfoComponent } from './components/pronunciation-info/pronunciation-info.component';
import { SoundRecordComponent } from './components/sound-record/sound-record.component';
import { whatToSayReducer } from './store/whatToSay/whatToSay.reducer';
import { languageReducer } from './store/language/language.reducer';
import { whatisHeardReducer } from './store/whatIsHeard/whatIsHeard.reducer';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    PronunciationTesterComponent,
    PronunciationInfoComponent,
    SoundRecordComponent
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
export class AppModule { }
