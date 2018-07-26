import { LoginPageModule } from './../pages/login/login.module';
import { ServicoCadastroPageModule } from './../pages/servico-cadastro/servico-cadastro.module';
import { ServicoCadastroPage } from './../pages/servico-cadastro/servico-cadastro';
import { CadastroPageModule } from './../pages/cadastro/cadastro.module';
import { CadastroPage } from './../pages/cadastro/cadastro';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ApiProvider } from '../providers/api/api';
import { UserProvider } from '../providers/user/user';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { LoginPage } from '../pages/login/login';
import { ServicoProvider } from '../providers/servico/servico';
import { ValidatorsModule } from '../validators/validators.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    CadastroPageModule,
    ServicoCadastroPageModule,
    LoginPageModule,
    ValidatorsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CadastroPage,
    ServicoCadastroPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    UserProvider,
    ServicoProvider
  ]
})
export class AppModule {}
