import { Component } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { ClientsService } from "../../services/clients/clients.service";
import {Client} from "../../models/client.model";


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {

  constructor(private toastr: ToastrService, private clientService: ClientsService) {}
  objectJson: any;
  aux: any;
  clientsList: any[] = [];


  edition: boolean = false;
  creation: boolean = false;
  searchFilter: string = "";

  getData(): void{
    this.clientsList.push({
      "id": 1,
      "name": "Matt",
      "address": "Otavalo SN y Principal",
      "phoneNumber": "098254785",
      "password": "1234",
      "status": true,
    });
        this.clientService.getClientes().subscribe((data: any[])=>{
          data.forEach(el=>{
            el.isEditing = false;
          });
          this.clientsList = data;
        });


  }

  showSuccess(): void{
    this.toastr.success('Guardado correctamente','Guardar');
  }

  showError(): void{
    this.toastr.error('Se ha eliminado el registro correctamente.','Eliminación');
  }


  saveItem(): String{
    if(!this.objectJson.name||!this.objectJson.address||!this.objectJson.phoneNumber||!this.objectJson.password){
      this.toastr.warning('Debes diligeniciar todos los datos del cliente.','Aviso');
    }else{
      //Save
      this.clientsList.push(this.objectJson);
      this.showSuccess();
      this.objectJson={};
      this.creation=false;
    }

    return '';
  }

  saveEdit(item:any): void{
    this.clientService.updateCliente(item.id, item)
      .subscribe((data: any) => {
        console.log(data);
        const index = this.clientsList.findIndex(c => c.id === item.id);
        this.clientsList[index] = data;
      });
      //Save
      this.showSuccess();
      this.creation=false;
  }


  newItem(): void{
    this.creation = true;
    // let newItem = {
    //   "id": 0,
    //   "name": this.objectJson.name,
    //   "address": this.objectJson.address,
    //   "phoneNumber": this.objectJson.phoneNumber,
    //   "password": this.objectJson.password,
    //   "status": this.objectJson.status,
    // }
    // this.clientsList.push(newItem);
  }





   editItem(item: any): void{
     if(this.edition){
       this.edition = false;
       item.isEditing = false;
     }else{
       this.aux = Object.assign({},item);
       this.edition = true;
       item.isEditing = true;
     }
  }

  cancelSave(): void{
    this.creation = false;
    this.objectJson = {};
  }

  cancelEdit(item: any): void{
    if(this.edition){
      this.clientsList.forEach(el=>{
        // el = {
        //   "id": 0,
        //   "name": this.aux.name,
        //   "address":  this.aux.address,
        //   "phoneNumber":  this.aux.phoneNumber,
        //   "password":  this.aux.password,
        //   "status": this.aux.status,
        // } Some Bug Founded with the Assign Backup Info
        if(el.id===item.id){
          el.name = this.aux.name;
          el.address = this.aux.address;
          el.phoneNumber = this.aux.phoneNumber;
          el.password = this.aux.password;
          el.status = this.aux.status;
        }
      });
      item.isEditing = false;
      this.edition = false;
      this.aux = {};
    }else{
      this.edition = true;
    }
  }

  deleteItem(index: any): void{
    this.clientService.deleteCliente(index)
      .subscribe((data: any) => {
        const index = this.clientsList.findIndex(c => c.id === index);
        this.clientsList.splice(index, 1);
        this.showError();
      });
  }

  ngOnInit(){
    this.getData();
    this.objectJson = {
      "id": 0,
      "name": "",
      "address": "",
      "phoneNumber": "",
      "password": "",
      "status": false,
    }
  }

}
