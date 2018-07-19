import { LoginPage } from './../login/login';
import { CadastroPage } from './../cadastro/cadastro';
import { ServicoCadastroPage } from './../servico-cadastro/servico-cadastro';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goCadastrarServico(){
    this.navCtrl.push(ServicoCadastroPage);
  }
  goCadastro(){
    this.navCtrl.push(CadastroPage);
  }
  goLogin(){
    this.navCtrl.push(LoginPage);
  }
}
