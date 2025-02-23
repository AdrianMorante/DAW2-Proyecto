import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private login : string = 'http://localhost:8090/login';

  constructor(
    private http: HttpClient
  ) { }

  ingresar( request : any ){
    return this.http.post(`${this.login}`, request, {
      observe : 'response'
    }).pipe(map( ( response : HttpResponse<any>) => {
      const body = response.body;
      const headers = response.headers;
      const bearerToken = headers.get('Authorization');
      const token = bearerToken ? bearerToken.replace('Bearer ', '') : null;

      if( token ){
        localStorage.setItem('token', token)
      }else{
        console.error('Error al autentificarse');
      }
      return body;
    }))
  }

  token(){
    return localStorage.getItem('token')
  }

  logout(){
    localStorage.removeItem('token')
  }

}
