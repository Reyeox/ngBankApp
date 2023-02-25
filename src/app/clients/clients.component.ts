import { Component } from '@angular/core';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {

  constructor(private toastr: ToastrService) {}

   clientsList = [
     {
       "id": 1,
       "name": "Matt",
       "address": "Otavalo SN y Principal",
       "phoneNumber": "098254785",
       "password": "1234",
       "status": true,
     }
   ];

  auxiliar: any = {
    "id": Number,
    "name": String,
    "address": String,
    "phoneNumber": Number,
    "password": String,
    "status": Boolean,
  }

  getData(): void{


  }

  showSucces(): void{
    this.toastr.success('Guardado correctamente','Guardar');
  }

  showError(): void{
    this.toastr.error('Se ha eliminado el registro correctamente.','Eliminación');
  }


  saveItem(): String{
    this.showSucces();
    return '';
  }




   edition: boolean = false;
   searchFilter: string = "";

   editItem(itemToEdit: any): void{
     if(this.edition){
       this.edition = false;
     }else{
       this.auxiliar = Object.assign({},itemToEdit);
       this.edition = true;
       console.log(this.auxiliar);
     }
  }

  cancelEdit(item: any): void{

    if(this.edition){
      item = {
        "name": this.auxiliar.name,
        "address": this.auxiliar.address,
        "phoneNumber": this.auxiliar.phoneNumber,
        "password": this.auxiliar.password,
        "status": this.auxiliar.status
      }
      this.edition = false;
    }else{
      this.edition = true;
      console.log(this.auxiliar);
    }
  }

  deleteItem(): boolean{
     this.showError();
     return true;
  }

}
