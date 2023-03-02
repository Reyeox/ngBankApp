import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8081/';

  getAccounts(): Observable<any> {
      return this.http.get(this.apiUrl + 'cuentas/');
  }

  // getCliente(id: number): Observable<any> {
  //   const url = `${this.apiUrl}/${id}`;
  //   return this.http.get(url);
  // }

  create(cuenta: any): Observable<any> {
    return this.http.post(this.apiUrl + 'cuentas/create', cuenta);
  }

  modify(id: number, cuenta: any): Observable<any> {
    const url = `${this.apiUrl}cuentas/modify?id=${id}`;
    return this.http.post(url, cuenta);
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiUrl}cuentas/delete?id=${id}`;
    return this.http.delete(url);
  }
}
