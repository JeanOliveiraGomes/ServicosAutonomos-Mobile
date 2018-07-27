import { ServicoCadastroPage } from './../servico-cadastro/servico-cadastro';
import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { ServicoProvider } from '../../providers/servico/servico';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public objeto_feed = {
    titulo:"",
    descricao:"",
    anunciante:{
      nome:""
    },
    categoria:{
      nome:""
    }
  };

  public lista_anuncios = new Array<any>();

  constructor(public navCtrl: NavController,  public servicoProvider: ServicoProvider,public toastCtrl: ToastController) {

  }

  ionViewWillLoad() {
    this.servicoProvider.listaAnuncios().subscribe(
      data=>{
        const response = (data as any)
        this.lista_anuncios = response;
        console.log(this.lista_anuncios)
      }, error => {
        console.log(error);
      }
    )
      
  

  }

  goCadastrarServico(){
    this.navCtrl.push(ServicoCadastroPage);
  }
  
}
