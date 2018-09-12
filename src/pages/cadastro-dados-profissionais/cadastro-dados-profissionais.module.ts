import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroDadosProfissionaisPage } from './cadastro-dados-profissionais';

@NgModule({
  declarations: [
    CadastroDadosProfissionaisPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroDadosProfissionaisPage),
  ],
})
export class CadastroDadosProfissionaisPageModule {}
