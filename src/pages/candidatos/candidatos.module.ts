import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CandidatosPage } from './candidatos';

@NgModule({
  declarations: [
    CandidatosPage,
  ],
  imports: [
    IonicPageModule.forChild(CandidatosPage),
  ],
})
export class CandidatosPageModule {}
