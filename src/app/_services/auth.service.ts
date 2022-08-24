import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';
// service
// const AUTH_API = 'http://10.1.137.50:8760/user/v1/'

// api gateway
const AUTH_API =
  'http://user-service-website-lelang-bca-dev.apps.ocpdev.dti.co.id/user/v1/';

// for passing data for POST
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private token: TokenStorageService,
    private router: Router
  ) {}

  login(credentials: any): Observable<any> {
    return this.http.post(
      AUTH_API + 'login',
      {
        email: credentials.email,
        password: credentials.password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'logout', {
      refreshToken: this.token.getRefreshToken(),
    });
  }
}
