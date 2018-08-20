import { Storage } from '@ionic/storage';
import { CadastroPage } from './../cadastro/cadastro';
import { UserProvider } from './../../providers/user/user';
import { ServicoCadastroPage } from './../servico-cadastro/servico-cadastro';
import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { ServicoProvider } from '../../providers/servico/servico';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  public buscaTitulo = false;
  public lista_anuncios = new Array<any>();
  public loader;
  public page = 0;
  public size;
  public tamanho;

  public infiniteScroll;


  constructor(

    public navCtrl: NavController,
    public servicoProvider: ServicoProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    private userProvider: UserProvider
  ) {
    this.carregarServico();


  };


  candidatar(idServico: string) {
    if (this.userProvider._user != null) {
      this.servicoProvider.candidatar(idServico).subscribe((data: any) => {
        let toastg = this.toastCtrl.create({
          message: 'Parabens, candidatura efetuada com sucesso',
          duration: 3000,
          position: 'top'
        });
        toastg.present();
      }, err => {
        let toastg = this.toastCtrl.create({
          message: 'Você ja é candidato ou é dono deste serviço!',
          duration: 3000,
          position: 'top'
        });
        toastg.present();
      });
    } else {
      this.navCtrl.push(CadastroPage);
    }
  }

  doInfinite(infiniteScroll) {

    this.page++
    this.servicoProvider.listaAnuncios(this.page, this.size).subscribe(
      data => {
        const response = (data as any)
        this.lista_anuncios = this.lista_anuncios.concat(response)
        infiniteScroll.complete();
      }, error => {
        console.log(error);

      }
    )



  }


  carregarServico(newpage: boolean = false) {

    this.servicoProvider.listaAnuncios(this.page, this.size).subscribe(
      data => {
        const response = (data as any)


        if (newpage) {
          this.lista_anuncios = this.lista_anuncios.concat(response)
          this.tamanho = this.lista_anuncios.length

        } else {
          this.lista_anuncios = response;

        }




      }, error => {
        console.log(error);

      }
    )
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
    let des: string = "des";
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
    if (this.userProvider._user != null) {
      this.navCtrl.push(ServicoCadastroPage);
    } else {
      this.navCtrl.push(CadastroPage);
    }
  };

};
