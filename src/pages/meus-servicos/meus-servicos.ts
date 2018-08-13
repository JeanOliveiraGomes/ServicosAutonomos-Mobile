import { ServicoProvider } from './../../providers/servico/servico';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the MeusServicosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-meus-servicos',
  templateUrl: 'meus-servicos.html',
})
export class MeusServicosPage {

  public meus_anuncios = new Array<any>();

  constructor(public navCtrl: NavController, public navParams: NavParams, public servicoProvider: ServicoProvider, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.getMeusServicos();
    console.log('ionViewDidLoad MeusServicosPage');
  }

  getMeusServicos(){
    this.servicoProvider.getMeusServicos().subscribe((data: any)=>{
        this.meus_anuncios= data;
    },  error =>{
      let toastg = this.toastCtrl.create({
        message: 'Falha ao buscar serviços, Tente Novamente',
        duration: 3000,
        position: 'top'
        });
      toastg.present();
    });
  }

}
