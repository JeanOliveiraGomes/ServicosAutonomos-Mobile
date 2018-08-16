import { Storage } from '@ionic/storage';
import { ApiProvider } from './../api/api';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { HttpHeaders, HttpClient } from '@angular/common/http';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  _user: string ='';
  _email:string;
  _nome:string;

  constructor(public api: ApiProvider,public  http: HttpClient, public storage : Storage) {
    console.log('Hello UserProvider Provider');
  }

  headerComAuthenticacao(){
    let headers = new HttpHeaders().append('Authorization', this.getAutorizationToken());
    return headers;
  }

  getUsurioEmailNome(){
    let headers = this.headerComAuthenticacao();
    let requisicao = this.api.get('usuarios/protected',{headers}).subscribe((data: any) =>{
      this._email = data.email;
      this._nome = data.nome;
    });
  }


  cadastrar(credenciais: any){
    let headers = new HttpHeaders().set('Content-Type','application/json');
    let requisicao = this.api.post('usuarios' , credenciais,{headers});
    return requisicao;
  }

  login(credenciais: any){
  
    let request = this.api.post('login',credenciais, {responseType: 'text'});

    request.subscribe((data: any)=>{
      
      this._loggedIn(data);
      console.log(data);
      
    });
    return request;
  }

    /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
    this.storage.clear();
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp;
 
  }

  getAutorizationToken(){
    return this._user
  }
}
