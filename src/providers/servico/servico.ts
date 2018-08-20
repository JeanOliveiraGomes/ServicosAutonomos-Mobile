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

  headerComAuthenticacao(){
    let headers = new HttpHeaders().append('Authorization', this.user.getAutorizationToken());
    return headers;
  }

  deletar(anuncioId: string){
    let headers = new HttpHeaders().append('Authorization', this.user.getAutorizationToken());
    let requisicao = this.api.post('protected/anuncios/deletar',anuncioId,{headers});
    return requisicao;

  }

  candidatar( servicoId: string){
    let headers = this.headerComAuthenticacao();
    let requisicao = this.api.put('protected/anuncios', servicoId, {headers});
    return requisicao;
  }

  cadastrar(servico: any){
    let headers = this.headerComAuthenticacao();
    let requisicao = this.api.post('protected/anuncios', servico, {headers});
    return requisicao;
  }

  buscaPorTitulo(busca){
    let headers = this.headerComAuthenticacao();
    let requisicao = this.api.get('protected/anuncios/busca/'+ busca, {headers});

    return requisicao;
  }
  listaAnuncios(page = 0, size=3){
    let requisicao = this.api.getSemCabecalho(`protected/anuncios/servico-paginado?page=${page}&size=${size}`);
    return requisicao;
  }
  listaAnuncios2(){
    let requisicao = this.api.getSemCabecalho(`protected/anuncios`);
    return requisicao;
  }

  getCategorias(){
    let headers = this.headerComAuthenticacao();
    let requisicao = this.api.get('categorias', {headers});
    return requisicao;
  }

  getMeusServicos(){
    let headers = this.headerComAuthenticacao();
    let requisicao = this.api.get('protected/anuncios/meus-anuncios', {headers});
    return requisicao;
  }


}
