import { HomePage } from './../home/home';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PasswordValidator } from '../../validators/password.validator';
import emailMask from 'text-mask-addons/dist/emailMask';
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

  validations_form: FormGroup;
  matching_passwords_group: FormGroup;
  emailMask = emailMask;

  conta: { nome: string, email: string, senha: string } = {
    nome: '',
    email: '',
    senha: ''
  };

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
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      matching_passwords: this.matching_passwords_group,
    });
  }

  validation_messages = {
    'name': [
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

  cadastra() {
    this.conta.nome = this.validations_form.get('name').value
    this.conta.email = this.validations_form.get('email').value
    this.conta.senha = this.matching_passwords_group.get('password').value

    this.user.cadastrar(this.conta).subscribe((resp) => {
      this.navCtrl.push(HomePage);
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: 'Erro no servidor',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}


