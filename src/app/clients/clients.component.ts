import { Component } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {

   myArray = [
     {
       "id": 1,
       "name": "Matt",
       "address": "Otavalo SN y Principal",
       "phoneNumber": "098254785",
       "password": "1234",
       "status": true,
     }
   ];

   edition: boolean = false;
   searchFilter: string = "";

   editItem(): void{
     if(this.edition){
       this.edition = false;
     }else{
       this.edition = true;
     }
  }

  deleteItem(): boolean{
     return true;
  }

}
