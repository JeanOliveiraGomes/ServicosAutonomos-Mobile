import { HomePage } from './../home/home';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credenciais: {email: string , senha: string}= {
    email: 'vitor@vitor.com',
    senha: 'vitor@vitor.com'
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, public user: UserProvider,public toastCtrl:ToastController) {

  }

  logar(){
    this.user.login(this.credenciais).subscribe((data: any)=>{
            let toast = this.toastCtrl.create({
            message: 'Logado com sucesso',
            duration: 3000,
            position: 'top'
          });
          toast.present();
          this.navCtrl.push(HomePage);
    }, err =>{
      let toastg = this.toastCtrl.create({
      message: 'Falha ao logar',
      duration: 3000,
      position: 'top'
      });
    toastg.present();
    });   
  }

}
