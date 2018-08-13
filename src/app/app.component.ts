import { UserProvider } from './../providers/user/user';
import { Component } from '@angular/core';
import { Platform, App, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { Page } from '../../node_modules/ionic-angular/umd/navigation/nav-util';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  
  rootPage = LoginPage;

  constructor(public app :App, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private userProvider: UserProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  pushPage(page : Page){
    let nav = this.app.getActiveNav();
    nav.push(page);
  }

logout(){
  this.userProvider.logout();
  this.pushPage(LoginPage);
}
}
