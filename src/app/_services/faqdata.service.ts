import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FAQ } from '../components/faq-home/faq-home.component';
import { TokenStorageService } from './token-storage.service';
@Injectable({
  providedIn: 'root',
})
export class FAQDataService {
  // token for get anything data
  private token_base = {
    headers: new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token.getToken()}`
    ),
  };

  private url_base =
    'http://faq-service-website-lelang-bca-dev.apps.ocpdev.dti.co.id/getAll?size=100';

  constructor(
    private httpClient: HttpClient,
    private token: TokenStorageService
  ) {}

  private url_create =
    'http://faq-service-website-lelang-bca-dev.apps.ocpdev.dti.co.id/create';
  private url_delete =
    'http://faq-service-website-lelang-bca-dev.apps.ocpdev.dti.co.id/delete/';
  private url_update =
    'http://faq-service-website-lelang-bca-dev.apps.ocpdev.dti.co.id/update/';

  private url_byid =
    'http://faq-service-website-lelang-bca-dev.apps.ocpdev.dti.co.id/get/';

  httpOptions_base = {
    headers: new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token_base}`
    ),
  };

  deleteFAQ(id: string): any {
    var url = this.url_delete.toString().concat(id);

    return this.httpClient.delete(url, this.httpOptions_base);
  }

  getFAQ(): Observable<FAQ[]> {
    return this.httpClient.get<FAQ[]>(this.url_base, this.httpOptions_base);
  }
  getFAQId(id: string): Observable<FAQ> {
    var url = this.url_byid.toString().concat(id);

    return this.httpClient.get<FAQ>(url, this.httpOptions_base);
  }

  createFAQ(newFAQ: FAQ): Observable<FAQ> {
    return this.httpClient.post<FAQ>(
      this.url_create,
      newFAQ,
      this.httpOptions_base
    );
  }

  updateFAQ(id: string, updatedFAQ: FAQ): Observable<FAQ> {
    var url = this.url_update.toString().concat(id);
    // console.log(url)
    return this.httpClient.put<FAQ>(url, updatedFAQ, this.httpOptions_base);
  }
}
