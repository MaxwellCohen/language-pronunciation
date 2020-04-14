import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PronunciationTesterComponent } from './pronunciation-tester/pronunciation-tester.component';


const routes: Routes = [
  {
    path: '',
    component: PronunciationTesterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
