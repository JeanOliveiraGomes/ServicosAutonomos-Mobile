import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CadastroDadosProfissionaisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-dados-profissionais',
  templateUrl: 'cadastro-dados-profissionais.html',
})
export class CadastroDadosProfissionaisPage {
  public dadosUsuario;

  constructor(

    public navCtrl: NavController, 
    public navParams: NavParams

  ){
    this.dadosUsuario = this.navParams.get('dados_usuario');
    
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroDadosProfissionaisPage');
    console.log(this.dadosUsuario)
  }

}
