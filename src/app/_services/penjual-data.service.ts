import { Injectable } from '@angular/core';
import { Seller } from '../components/penjual-home/penjual-home.component';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
@Injectable({
  providedIn: 'root',
})
export class PenjualDataService {
  // token for get anything data
  private token_base = {
    headers: new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token.getToken()}`
    ),
  };

  private url_base = 'http://10.1.137.50:8763/getAll';

  constructor(
    private httpClient: HttpClient,
    private token: TokenStorageService
  ) {}

  private url_create = 'http://10.1.137.50:8763/create';
  private url_delete = 'http://10.1.137.50:8763/delete/';
  private url_update = 'http://10.1.137.50:8763/update/';

  private url_byid = 'http://10.1.137.50:8763/get/';

  httpOptions_base = {
    headers: new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token_base}`
    ),
  };

  deleteSeller(id: string): any {
    var url = this.url_delete.toString().concat(id);

    return this.httpClient.delete(url, this.httpOptions_base);
  }

  getSeller(): Observable<Seller[]> {
    return this.httpClient.get<Seller[]>(this.url_base, this.httpOptions_base);
  }
  getSellerbyId(id: string): Observable<Seller> {
    var url = this.url_byid.toString().concat(id);

    return this.httpClient.get<any>(url, this.httpOptions_base);
  }

  createSeller(newsel: Seller): Observable<Seller> {
    return this.httpClient.post<Seller>(
      this.url_create,
      newsel,
      this.httpOptions_base
    );
  }

  updateSeller(id: string, updatedseller: Seller): Observable<Seller> {
    // console.log(updatedseller)
    // console.log(this.token_base)
    var url = this.url_update.toString().concat(id);
    return this.httpClient.put<Seller>(
      url,
      updatedseller,
      this.httpOptions_base
    );
  }
}
