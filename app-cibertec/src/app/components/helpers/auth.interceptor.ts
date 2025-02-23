import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "../../servicio/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _loginService: LoginService
  ){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this._loginService.token();

    if(token){
      const clone = req.clone({
        headers : req.headers.set('Authorization', `Bearer ${token}`)
      })
      return next.handle(clone);
    }

    return next.handle(req);

  }

}
