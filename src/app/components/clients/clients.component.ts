import { Component } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { ClientsService } from "../../services/clients/clients.service";



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
        this.clientService.getClientes().subscribe((data: any[])=>{
          if(data!==null){
            data.forEach(el=>{
              el.isEditing = false;
            });
            this.clientsList = data;
          }else{
            this.toastr.error('No hay información de clientes...');
          }
        });
  }

  showSuccess(): void{
    this.toastr.success('Guardado correctamente','Guardar');
  }

  showError(): void{
    this.toastr.error('Se ha eliminado el registro correctamente.','Eliminación');
  }


  saveItem(): String{
    if(!this.objectJson.nombre||!this.objectJson.direccion||!this.objectJson.telefono||!this.objectJson.contrasena){
      this.toastr.warning('Debes diligeniciar todos los datos del cliente.','Aviso');
    }else{
      //Save
      this.objectJson.id = this.clientsList.length+1;
      this.clientService.create(this.objectJson)
      .subscribe(data =>{
        this.getData();
        this.showSuccess();
        this.objectJson={};
      this.creation=false;
      });
      
    }

    return '';
  }

  saveEdit(item:any): void{
    this.clientService.modify(item.clienteId, item)
      .subscribe((data: any) => {
        this.showSuccess();
        this.getData();
        this.edition = false;
      });
      //Save
      
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
          el.name = this.aux.nombre;
          el.address = this.aux.direccion;
          el.phoneNumber = this.aux.telefono;
          el.password = this.aux.contrasena;
          el.status = this.aux.estado;
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
    this.clientService.delete(index)
      .subscribe((data: any) => {
        this.getData();
        this.showError();
      });
  }

  ngOnInit(){
    this.getData();
    this.objectJson = {
      "clientId": 0,
      "nombre": "",
      "direccion": "",
      "telefono": "",
      "contrasena": "",
      "estado": false,
    }
  }

}
