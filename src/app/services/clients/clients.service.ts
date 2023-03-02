import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private apiUrl = 'http://localhost:8081/';
  
  constructor(private http: HttpClient) { }


  getClientes(): Observable<any> {
      return this.http.get(this.apiUrl + 'clientes/');
  }

  // getCliente(id: number): Observable<any> {
  //   const url = `${this.apiUrl}/${id}`;
  //   return this.http.get(url);
  // }

  create(cliente: any): Observable<any> {
    return this.http.post(this.apiUrl + 'clientes/create', cliente);
  }

  modify(id: number, cliente: any): Observable<any> {
    const url = `${this.apiUrl}clientes/modify?id=${id}`;
    return this.http.post(url, cliente);
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiUrl}clientes/delete?id=${id}`;
    return this.http.delete(url);
  }
}
