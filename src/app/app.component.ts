import { HomePage } from './../pages/home/home';
import { UserProvider } from './../providers/user/user';
import { Component, ViewChild, HostListener } from '@angular/core';
import { Platform, App, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  
  rootPage: any = LoginPage;
  usuarioEmail:string = null;  
  usuarioNome:string = null;

  @ViewChild(Nav) nav: Nav;
  
  pages: any[] = [
    { title: 'Meus Serviços', component: 'MeusServicosPage', active: true, icon: 'ios-home' }
    //{ title: 'Busca Pessoas', component: 'NAO FOI CRIADO', active: true, icon: 'search' },
    //{ title: 'Chat', component: 'NÃO FOI CRIADO', active: true, icon: 'ios-chatbubbles' },
    //{ title: 'MinhaConta', component: 'MinhaContaPage', active: true, icon: 'md-person' }
  ]


constructor(public app :App, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private userProvider: UserProvider) {
    platform.ready().then(() => {

  

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }
  @HostListener('touchend', ['$event'])
  runThisMethod() {
    if((this.usuarioEmail || this.usuarioNome)==null){
      this.usuarioEmail =this.userProvider._nome;
      this.usuarioNome = this.userProvider._email;
    }

  }

  homepage(){

    this.nav.setRoot(HomePage);
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


logout(){
  this.userProvider.logout();
  this.nav.push(LoginPage);
}

}
