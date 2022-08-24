import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../components/sidebar/user';
import { TokenStorageService } from './token-storage.service';
import { Observable } from 'rxjs';
// import { Operator } from '../components/operator-home/operator-home.component';

const PROFILE_API = 'http://10.1.137.50:8760/user/v1/'
const OPERATOR_CREATE_API = 'http://10.1.137.50:8080/auth/admin/v1/createOperator'

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  // token for get anything data
  httpOptions_base = {
    headers: new HttpHeaders().set(
      "Authorization",
      `Bearer ${this.token.getToken()}`
    )
  }

  constructor(
    private token: TokenStorageService,
    private http: HttpClient
  ) { }

  getUserData(): Observable<User> {
    // the parameter is API_URL and the token
    return this.http.get<User>(PROFILE_API, this.httpOptions_base)
  }

  createOperator(data: any): Observable<any> {
    return this.http.post(OPERATOR_CREATE_API, data, this.httpOptions_base)
  }
}
