import { ServicoProvider } from './../../providers/servico/servico';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the CandidatosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-candidatos',
  templateUrl: 'candidatos.html',
})
export class CandidatosPage {
  public id:string;
  public refresher;
  public isRefresher: boolean = false;
  public candidatos = new Array<any>();
  constructor(public navCtrl: NavController, public navParams: NavParams, public servicoProvider: ServicoProvider, public toastCtrl: ToastController) {
    this.id = navParams.get('id');
    this.getCandidatos(this.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CandidatosPage');
  }

  getCandidatos(id:string){
    this.id = id;
    this.servicoProvider.getCandidatos(id).subscribe((data: any)=>{
        this.candidatos= data;
        if (this.refresher) {
          this.refresher.complete();
          this.isRefresher = false;}
    },  error =>{
      let toastg = this.toastCtrl.create({
        message: 'Falha ao buscar candidatos, Tente Novamente',
        duration: 3000,
        position: 'top'
        });
      toastg.present();
      
    });
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefresher = true;
    this.getCandidatos(this.id);
  }

}
