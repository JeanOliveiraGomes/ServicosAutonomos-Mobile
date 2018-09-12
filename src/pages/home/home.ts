import { Storage } from '@ionic/storage';
import { CadastroPage } from './../cadastro/cadastro';
import { UserProvider } from './../../providers/user/user';
import { ServicoCadastroPage } from './../servico-cadastro/servico-cadastro';
import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { ServicoProvider } from '../../providers/servico/servico';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  public buscaTitulo = false;
  public lista_anuncios = new Array<any>();
  public dados_usuario:any;
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
    public alertController:AlertController,
    private userProvider: UserProvider
  ) {
    this.carregarServico();
    this.carregarDadosUsuario();



  };



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
      })
  };
  carregarDadosUsuario(){
    this.userProvider.getDadosUsuario().subscribe(
      user=>{
        const response = user;
        this.dados_usuario = response;
        console.log(this.dados_usuario) 
    });
  }

  candidatar(idServico: string) {
    if(this.dados_usuario.dadosProfissionais == null){
      const confirm = this.alertController.create({
        title: 'Opa',
        message: 'Para se candidatar é preciso estar com os dados atualizados!',
        buttons: [
          {
            text: 'cancelar',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'Atualizar',
            handler: () => {
              this.navCtrl.push("CadastroDadosProfissionaisPage", {dados_usuario: this.dados_usuario})
            }
          }
        ]
      });
      confirm.present();
    }else{
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
    
  }

  goCadastrarServico() {
    if (this.userProvider._user != null) {
      this.navCtrl.push(ServicoCadastroPage);
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

  doRefresh(refresher) {
    this.servicoProvider.listaAnuncios().subscribe(
      data => {
        const response = (data as any)
        this.lista_anuncios = response
        refresher.complete();
      }, error => {
        console.log(error);
      });
  }

  onSearch(event) {
    let result: string = event.target.value;
    let des: string = "des";
    console.log(result);
    if (result && result.trim() != "") {
      this.servicoProvider.buscaPorTitulo(result).subscribe(
        data => {
          const response = (data as any)
          this.lista_anuncios = response;
        })
    } else {
      this.servicoProvider.listaAnuncios().subscribe(
        data => {
          const response = (data as any)
          this.lista_anuncios = response;
        }, error => {
          console.log(error);
        })
      console.log(this.lista_anuncios)
    };
    
  };
  onCancel(){
    this.buscaTitulo = false;
    this.carregarServico();
  }

  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando..."
    });
    this.loader.present();
  };

  fechaCarregando() {
    this.loader.dismiss();
  };
};
