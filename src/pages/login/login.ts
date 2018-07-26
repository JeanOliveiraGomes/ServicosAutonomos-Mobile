import { HomePage } from './../home/home';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import emailMask from 'text-mask-addons/dist/emailMask';

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
  
  validations_form: FormGroup;
  emailMask = emailMask;

  credenciais: {email: string , senha: string}= {
    email: '',
    senha: ''
  };
  constructor(

              public navCtrl: NavController, 
              public navParams: NavParams, 
              public user: UserProvider,
              public toastCtrl:ToastController,
              public formBuilder: FormBuilder
            
            ) {

  }
  ionViewWillLoad() {

    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
    });
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email é obrigatório.' },
      { type: 'pattern',  message: 'Entre com um email válido.' }
    ],
    'password': [
      { type: 'required',   message:  'Senha é obrigatório.' },
      { type: 'minlength',  message:  'Senha teve conter no minimo 8 caracteres.' },
      { type: 'pattern',    message:  'Sua senha deve conter no mínimo uma letra maiúscula, uma minúscula e 1 numero.' }
    ]
  };

  logar(){
    
    this.credenciais.email = this.validations_form.get('email').value
    this.credenciais.senha = this.validations_form.get('password').value
    console.log(this.credenciais)

    this.user.login(this.credenciais).subscribe((data: any)=>{
          this.navCtrl.push(HomePage);
    }, err =>{
      let toastg = this.toastCtrl.create({
      message: 'Erro no servidor',
      duration: 3000,
      position: 'top'
      });
    toastg.present();
    });   
  }

}


