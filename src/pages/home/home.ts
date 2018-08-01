import { ServicoCadastroPage } from './../servico-cadastro/servico-cadastro';
import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { ServicoProvider } from '../../providers/servico/servico';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  public buscaTitulo = false;
  public lista_anuncios = new Array<any>();
  public loader;
  public refresher;
  public isRefresher: boolean = false;


  constructor(

    public navCtrl: NavController,
    public servicoProvider: ServicoProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) { };


  doRefresh(refresher) {

    this.refresher = refresher;
    this.isRefresher = true;
    this.carregarFilmes();
  }
  carregarFilmes() {
    this.abreCarregando();
    this.servicoProvider.listaAnuncios().subscribe(
      data => {
        const response = (data as any)
        this.lista_anuncios = response;
        this.fechaCarregando();
        if (this.refresher) {
          this.refresher.complete();
          this.isRefresher = false;
        };
      }, error => {
        console.log(error);
        this.fechaCarregando();
        if (this.refresher) {
          this.refresher.complete();
          this.isRefresher = false;
        };
      }
    )
  };

  ionViewDidEnter() {
    this.carregarFilmes();
  };

  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando..."
    });
    this.loader.present();
  };

  fechaCarregando() {
    this.loader.dismiss();
  };
  onSearch(event) {
    let result: string = event.target.value;
    let des: string = "des"
    console.log(result);
    if (result && result.trim() != "") {
      this.servicoProvider.buscaPorTitulo(result).subscribe(
        data => {
          const response = (data as any)
          this.lista_anuncios = response;
        }
      )

    } else {
      this.servicoProvider.listaAnuncios().subscribe(
        data => {
          const response = (data as any)
          this.lista_anuncios = response;

        }, error => {
          console.log(error);
        }
      )
      console.log(this.lista_anuncios)

    };
  };

  goCadastrarServico() {
    this.navCtrl.push(ServicoCadastroPage);
  };

};
