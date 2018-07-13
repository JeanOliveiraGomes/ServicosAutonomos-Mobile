import { ApiProvider } from './../api/api';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  _user: any;

  constructor(public api: ApiProvider) {
    console.log('Hello UserProvider Provider');
  }


  cadastrar(credenciais: any){
    let requisicao = this.api.post('usuarios' , credenciais);
    
    requisicao.subscribe((res: any)=>{
      if(res.status == 'success'){
        this._loggedIn(res);
      }
    }, err =>{
      console.error('ERRO AO CADASTRAR', err);
    }
    );
    return requisicao;
  }


    /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
  }
}
