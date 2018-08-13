import { UserProvider } from './../providers/user/user';
import { Component } from '@angular/core';
import { Platform, App} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  
  rootPage = LoginPage;

  constructor(public app :App, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private userProvider: UserProvider ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

logout(){
  this.userProvider.logout();
  let nav = this.app.getActiveNav();
  nav.push(LoginPage);
}

}
