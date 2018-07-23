import { HomePage } from './../home/home';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {


  account: { nome: string, email: string, senha: string} = {
    nome: null,
    email: null,
    senha: null
  };

  senha2: string =null;

  constructor(public navCtrl: NavController, public navParams: NavParams,public user :UserProvider, public toastCtrl: ToastController) {
  }

  
  cadastrar() {
       // Attempt to login in through our User service
       let valido = this.validarCredenciais();
       if(valido){
       this.user.cadastrar(this.account).subscribe((resp) => {
        this.navCtrl.push(HomePage);
        let toast = this.toastCtrl.create({
          message: 'Cadastrado com Sucesso',
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }, (err) => {
          
        // Unable to sign up
        let toast = this.toastCtrl.create({
          message: 'Erro ao cadastar',
          duration: 3000,
          position: 'top'
        });
        toast.present();
      });
    }
    }

    validarCredenciais():boolean{
      if(this.account.nome==null || this.account.email==null || this.account.senha==null || this.senha2==null){
        let toastFieldsError = this.toastCtrl.create({
          message: 'Preencha todos os campos',
          duration: 3000,
          position: 'top'
        });
        toastFieldsError.present();
        return false;
    }else if(this.account.senha != this.senha2){
      let conflitoDeSenha = this.toastCtrl.create({
        message: 'Erro, Senhas diferentes',
        duration: 3000,
        position: 'top'
      });
      conflitoDeSenha.present();
      return false;
    
    }else{
      return true;
    }
  }
}

