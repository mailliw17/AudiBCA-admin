import { Injectable } from '@angular/core';
import { Branch } from '../components/cabang-penjual-home/cabang-penjual-home.component';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Seller } from '../components/penjual-home/penjual-home.component';
import { TokenStorageService } from './token-storage.service';
@Injectable({
  providedIn: 'root',
})
export class BranchDataService {
  // token for get anything data
  private token_base = {
    headers: new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token.getToken()}`
    ),
  };

  private url_base = 'http://10.1.137.50:8764/getAll?size=100';

  constructor(
    private httpClient: HttpClient,
    private token: TokenStorageService
  ) {}
  private url_province = 'http://10.1.137.50:8770/province/getAll';
  private url_sellers = 'http://10.1.137.50:8763/getAll';
  private url_sellerid = 'http://10.1.137.50:8763/get/';
  private url_create = 'http://10.1.137.50:8764/create';
  private url_delete = 'http://10.1.137.50:8764/delete/';
  private url_update = 'http://10.1.137.50:8764/update/';

  private url_byid = 'http://10.1.137.50:8764/get/';

  httpOptions_base = {
    headers: new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token_base}`
    ),
  };
  getProvince(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url_province, this.httpOptions_base);
  }
  getSellers(): Observable<Seller[]> {
    return this.httpClient.get<Seller[]>(
      this.url_sellers,
      this.httpOptions_base
    );
  }
  getSellerId(id: string): Observable<Seller> {
    var url = this.url_sellerid.toString().concat(id);
    return this.httpClient.get<Seller>(url, this.httpOptions_base);
  }
  deleteBranch(id: string): any {
    var url = this.url_delete.toString().concat(id);
    // console.log(url)
    return this.httpClient.delete(url, this.httpOptions_base);
  }

  getBranch(): Observable<Branch[]> {
    return this.httpClient.get<Branch[]>(this.url_base, this.httpOptions_base);
  }
  getBranchbyId(id: string): Observable<Branch> {
    var url = this.url_byid.toString().concat(id);

    return this.httpClient.get<any>(url, this.httpOptions_base);
  }

  createBranch(newbranch: Branch): Observable<Branch> {
    return this.httpClient.post<Branch>(
      this.url_create,
      newbranch,
      this.httpOptions_base
    );
  }

  updateBranch(id: string, updatedBranch: Branch): Observable<Branch> {
    var url = this.url_update.toString().concat(id);
    // console.log(url)
    return this.httpClient.put<Branch>(
      url,
      updatedBranch,
      this.httpOptions_base
    );
  }
}
