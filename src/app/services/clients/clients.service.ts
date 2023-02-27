import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  clientListMock: any = [{
    "id": 1,
    "name": "Matt",
    "address": "Otavalo SN y Principal",
    "phoneNumber": "098254785",
    "password": "1234",
    "status": true,
  },
    {
      "id": 2,
      "name": "Matt",
      "address": "Otavalo SN y Principal",
      "phoneNumber": "098254785",
      "password": "1234",
      "status": true,
    },
    {
      "id": 3,
      "name": "Matt",
      "address": "Otavalo SN y Principal",
      "phoneNumber": "098254785",
      "password": "1234",
      "status": true,
    }];
  constructor(private http: HttpClient) { }
  private apiUrl = 'https://localhost:8080/clientes';
  getClientes(): Observable<any> {
    if(true){
      return this.clientListMock;
    }else{
      return this.http.get(this.apiUrl);
    }
  }

  getCliente(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url);
  }

  addCliente(cliente: any): Observable<any> {
    return this.http.post(this.apiUrl, cliente);
  }

  updateCliente(id: number, cliente: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, cliente);
  }

  deleteCliente(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
