import { UserProvider } from './../user/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';

/*
  Generated class for the ServicoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicoProvider {

  constructor(public http: HttpClient, public api : ApiProvider, public user: UserProvider) {
    console.log('Hello ServicoProvider Provider');
  }

  cadastrar(servico: any){
    let headers = new HttpHeaders().set('Authorization', this.user.getAutorizationToken());
    let requisicao = this.api.post('protected/anuncios', servico, {headers});
    return requisicao;
  }
}
