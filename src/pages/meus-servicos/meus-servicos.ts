import { CandidatosPage } from './../candidatos/candidatos';
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
  public refresher;
  public isRefresher: boolean = false;
  public meus_anuncios = new Array<any>();

  constructor(public navCtrl: NavController, public navParams: NavParams, public servicoProvider: ServicoProvider, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.getMeusServicos();
    console.log('ionViewDidLoad MeusServicosPage');
  }

  deletar(anuncioId: string){
    this.servicoProvider.deletar(anuncioId).subscribe((data: any)=>{
      let toastg = this.toastCtrl.create({
        message: 'Anuncio Apagado Com Sucesso',
        duration: 3000,
        position: 'top'
        });
      toastg.present();
      this.getMeusServicos();
  },  error =>{
    let toastg = this.toastCtrl.create({
      message: 'Falha ao buscar serviços, Tente Novamente',
      duration: 3000,
      position: 'top'
      });
    toastg.present();
  });
  }

  getMeusServicos(){
    this.servicoProvider.getMeusServicos().subscribe((data: any)=>{
        this.meus_anuncios= data;
        if (this.refresher) {
          this.refresher.complete();
          this.isRefresher = false;}
    },  error =>{
      let toastg = this.toastCtrl.create({
        message: 'Falha ao buscar serviços, Tente Novamente',
        duration: 3000,
        position: 'top'
        });
      toastg.present();
      
    });
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefresher = true;
    this.getMeusServicos();
  }

  goCandidatos(id:string){
   
    this.navCtrl.push(CandidatosPage, {
      id: id

    });
  }

}
