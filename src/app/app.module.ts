import { CandidatosPageModule } from './../pages/candidatos/candidatos.module';
import { CandidatosPage } from './../pages/candidatos/candidatos';
import { MeusServicosPageModule } from './../pages/meus-servicos/meus-servicos.module';
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
import { IonicStorageModule } from '@ionic/storage';
import { MeusServicosPage } from '../pages/meus-servicos/meus-servicos';
import { AutoHideDirective } from '../directives/auto-hide/auto-hide';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr)
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AutoHideDirective
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    CadastroPageModule,
    MeusServicosPageModule,
    ServicoCadastroPageModule,
    LoginPageModule,
    CandidatosPageModule,
    ValidatorsModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CadastroPage,
    ServicoCadastroPage,
    LoginPage,
    MeusServicosPage,
    CandidatosPage
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "pt" },
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    UserProvider,
    ServicoProvider,
    
  ]
})
export class AppModule {}
