import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthI } from '../models/auth.model';
import { map } from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private userToken='';
  private refreshToken;
  private url = environment.url;

  constructor(private http: HttpClient) { 
    this.leerToken();
  }

  login(user: AuthI) {

    return this.http.post(
     
      `${this.url}/loanservice/v1/auth/login`,user
    ).pipe(map(resp=>{
      this.guardarToken(resp['access_token'],resp['refresh_token']);
      console.log(resp);
      
      return resp;
    }));
    
   

  }

  private guardarToken( idToken: string,refreshToken:string ) {

    this.userToken = idToken;
    this.refreshToken=refreshToken;
    localStorage.setItem('token', idToken);
    localStorage.setItem('refresh', refreshToken);

     let hoy = new Date();
     hoy.setSeconds( 5000 );

     localStorage.setItem('expira', hoy.getTime().toString() );


  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    localStorage.removeItem('expira');
  }

  leerToken() {

    if ( localStorage.getItem('token') && localStorage.getItem('refresh')) {
      this.userToken = localStorage.getItem('token');
      this.refreshToken=localStorage.getItem('refresh');
    } else {
      this.userToken = '';
      this.refreshToken='';
    }

    return this.userToken;

  }


  estaAutenticado(): boolean {

    if ( this.userToken.length < 20 ) {
      return false;
    }

     const expira = Number(localStorage.getItem('expira'));
     const expiraDate = new Date();
     expiraDate.setTime(expira);

    if ( expiraDate > new Date() ) {
      return true;
    } else {
      return false;
    }


  }

}
