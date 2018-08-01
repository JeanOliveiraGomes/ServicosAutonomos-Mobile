import { HomePage } from './../home/home';
import { ServicoProvider } from './../../providers/servico/servico';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the ServicoCadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-servico-cadastro',
  templateUrl: 'servico-cadastro.html',
})
export class ServicoCadastroPage {

  arrayCategorias: Array<Categoria>;

servico: { titulo: string, descricao: string, categoria:{id:string}} = {
    titulo: null,
    descricao: null,
    categoria:{id: null}
  };


  constructor(public navCtrl: NavController, public navParams: NavParams, public servicoProvider: ServicoProvider, public toastCtrl: ToastController) {
    this.getCategorias();
   }
  
getCategorias(){
  this.servicoProvider.getCategorias().subscribe((data: any)=>{
    this.arrayCategorias = data;
  }, err =>{
    let toastg = this.toastCtrl.create({
    message: 'Falha ao Buscar Anuncios',
    duration: 3000,
    position: 'top'
    });
    toastg.present();
    });
}

cadastrar(){
  this.servicoProvider.cadastrar(this.servico).subscribe((data: any)=>{
    let toast = this.toastCtrl.create({
    message: 'Anucnio Criado Com Sucesso',
    duration: 3000,
    position: 'top'
  });
  toast.present();
  this.navCtrl.setRoot(HomePage)
}, err =>{
let toastg = this.toastCtrl.create({
message: 'Falha ao criar Anuncio',
duration: 3000,
position: 'top'
});
toastg.present();
});   
}

}

export class Categoria {
  id:string;
  nome:string
}