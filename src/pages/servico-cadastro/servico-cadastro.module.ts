import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicoCadastroPage } from './servico-cadastro';

@NgModule({
  declarations: [
    ServicoCadastroPage,
  ],
  imports: [
    IonicPageModule.forChild(ServicoCadastroPage),
  ],
})
export class ServicoCadastroPageModule {}
