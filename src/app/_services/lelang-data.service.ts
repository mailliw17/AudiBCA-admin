import { Injectable } from '@angular/core';
import { Lelang } from '../components/lot-lelang-home/lot-lelang-home.component';
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { catchError, firstValueFrom, map, tap } from 'rxjs';
import { Observable, of } from 'rxjs';
import { Organizer } from '../components/penyelenggara-home/penyelenggara-home.component';
import { Branch } from '../components/cabang-penjual-home/cabang-penjual-home.component';
import { Seller } from '../components/penjual-home/penjual-home.component';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LelangDataService {
  // token for get anything data
  private token_base = {
    headers: new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token.getToken()}`
    ),
  };
  //private url_base="http://10.1.137.50:8080/auction-object/getAll";
  private url_base = 'http://10.1.137.50:8766/getAll?size=100';
  private url_base_admin = 'http://10.1.137.50:8766/getAllAdmin?size=100';

  constructor(
    private httpClient: HttpClient,
    private token: TokenStorageService
  ) {}

  private url_bought = 'http://10.1.137.50:8766/buy/';
  private url_org = 'http://10.1.137.50:8762/getAll';
  private url_branchbysel = 'http://10.1.137.50:8764/getAll/seller/';
  private url_create = 'http://10.1.137.50:8766/create';
  private url_delete = 'http://10.1.137.50:8766/delete/';
  private url_update = 'http://10.1.137.50:8766/update/';
  private url_seller = 'http://10.1.137.50:8763/getAll';
  private url_byid = 'http://10.1.137.50:8766/get/';
  lel_list: Lelang[] = [];
  httpOptions_base = {
    headers: new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token_base}`
    ),
  };

  httpOption_Create_Update = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getLelang(): Observable<any[]> {
    return this.httpClient.get<any[]>(
      this.url_base_admin + '&image=false',
      this.httpOptions_base
    );
  }

  deleteLelang(id: string): any {
    var url = this.url_delete.toString().concat(id);
    return this.httpClient.delete(url, this.httpOptions_base);
  }
  AddLelang(
    newlel: Lelang,
    tempimg: any[],
    attachment: any
  ): Observable<Lelang> {
    var temp: any = newlel;
    delete temp['isActive'];
    delete temp['is_bought'];

    var formData: any = new FormData();

    for (var i = 1; i < tempimg.length + 1; i++) {
      var str = new String('image').concat(i.toString());
      formData.append(str.toString(), tempimg[i - 1]);
    }

    formData.append('auctionObjectString', JSON.stringify(temp));
    formData.append('attachment', attachment);

    return this.httpClient.post<Lelang>(
      this.url_create,
      formData,
      this.httpOptions_base
    );
  }

  getOrganizer(): Observable<Organizer[]> {
    return this.httpClient.get<Organizer[]>(
      this.url_org,
      this.httpOptions_base
    );
  }

  getSeller(): Observable<Seller[]> {
    return this.httpClient.get<Seller[]>(
      this.url_seller,
      this.httpOptions_base
    );
  }
  getLelbyId(id: string): Observable<any> {
    var url = this.url_byid.toString().concat(id);

    return this.httpClient.get<any>(url, this.httpOptions_base);
  }

  getBranch(sellerid: any): Observable<Branch[]> {
    var x = new String('?size=999');
    var url = this.url_branchbysel
      .toString()
      .concat(sellerid)
      .concat(x.toString());
    return this.httpClient.get<Branch[]>(url, this.httpOptions_base);
  }

  updateLel(
    id: string,
    updatedlel: Lelang,
    tempimg: any[],
    attachment: any
  ): Observable<Lelang> {
    // console.log(tempimg)
    var temp: any = updatedlel;
    delete temp['isActive'];
    delete temp['is_bought'];
    var url = this.url_update.toString().concat(id);

    var formData: any = new FormData();

    for (var i = 1; i < tempimg.length + 1; i++) {
      var str = new String('image').concat(i.toString());
      formData.append(str.toString(), tempimg[i - 1]);
    }

    formData.append('auctionObjectString', JSON.stringify(temp));
    formData.append('attachment', attachment);

    return this.httpClient.put<Lelang>(url, formData, this.httpOptions_base);
  }
  filegetter(url: string): Observable<Blob> {
    return this.httpClient.get<Blob>(url, { responseType: 'blob' as 'json' });
  }
  filegetterimg(url: string): Promise<Blob> {
    return firstValueFrom(
      this.httpClient.get<Blob>(url, { responseType: 'blob' as 'json' })
    );
  }
  is_bought(id: string): Observable<any> {
    var url = this.url_bought.concat(id);
    return this.httpClient.put(url, this.httpOptions_base);
  }
}
