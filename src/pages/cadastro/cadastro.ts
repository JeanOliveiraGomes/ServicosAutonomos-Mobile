import { HomePage } from './../home/home';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { PasswordValidator } from '../../validators/password.validator';
import emailMask from 'text-mask-addons/dist/emailMask';
import { LoginPage } from '../login/login';
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

  cadastroData = { nome: '', email: '', senha: '' };
  nome: AbstractControl;
  email: AbstractControl;
  senha: AbstractControl;
  confirm_password: AbstractControl;

  validations_form: FormGroup;
  matching_passwords_group: FormGroup;
  emailMask = emailMask;

  passwordtype: string = 'password';
  cnfpasswordtype: string = 'password';
  cnfpasseye: string = 'eye';
  passeye: string = 'eye';


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public user: UserProvider,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder
  ) {

  }
  ionViewWillLoad() {

    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    this.validations_form = this.formBuilder.group({
      nome: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      matching_passwords: this.matching_passwords_group,
    });

    this.nome = this.validations_form.controls['nome'];
    this.email = this.validations_form.controls['email'];
    this.senha = this.matching_passwords_group.controls['password'];

  }

  validation_messages = {
    'nome': [
      { type: 'required', message: 'Nome é obrigatório.' }
    ],
    'email': [
      { type: 'required', message: 'Email é obrigatório.' },
      { type: 'pattern', message: 'Entre com um email válido.' }
    ],
    'password': [
      { type: 'required', message: 'Senha é obrigatório.' },
      { type: 'minlength', message: 'Senha teve conter no minimo 8 caracteres.' },
      { type: 'pattern', message: 'Sua senha deve conter no mínimo uma letra maiúscula, uma minúscula e 1 numero.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirmação de senha é obrigatório.' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Senhas incompatíveis.' }
    ],
  };

  managePassword() {
    if (this.passwordtype == 'password') {
      this.passwordtype = 'text';
      this.passeye = 'eye-off';
    } else {
      this.passwordtype = 'password';
      this.passeye = 'eye';
    }
  }
  managecnfPassword() {
    if (this.cnfpasswordtype == 'password') {
      this.cnfpasswordtype = 'text';
      this.cnfpasseye = 'eye-off';
    } else {
      this.cnfpasswordtype = 'password';
      this.cnfpasseye = 'eye';
    }
  }

  moveToLogin() {
    this.navCtrl.push(LoginPage);
  }
  cadastra(cadastroData) {
    this.user.cadastrar(JSON.stringify(cadastroData)).subscribe((resp) => {
      this.navCtrl.push(HomePage);
    }, (error) => {
      if(error.status == 500){
        let toast = this.toastCtrl.create({
          message: 'Este email já é cadastrado.',
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }else{
        let toast = this.toastCtrl.create({
          message: 'Erro no servidor',
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
      
    });
  };
}


