import { Component } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {ClientsService} from "../../services/clients/clients.service";
import { AccountsService } from 'src/app/services/accounts/accounts.service';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css']
})
export class MovementsComponent {
  constructor(private toastr: ToastrService, private accountService: AccountsService, private clientService: ClientsService) {}
  objectJson: any;
  aux: any;
  accountsList: any[] = [];
  clientList: any[] = [];
  movementsList: any[] = [];

  edition: boolean = false;
  creation: boolean = false;
  searchFilter: string = "";

  getDataClients(): void{
    this.clientService.getClientes().subscribe((data: any[]) =>{
      if(data!==null){
        this.clientList = data;
      }
      this.getDataAccounts();
    })
  };

  getValuesOfAccount(): void{
    this.accountsList.forEach(el=>{
      if(this.objectJson.numeroCuenta===el.numeroCuenta.toString()){
        this.objectJson.tipoCuenta = el.tipoCuenta;
        this.objectJson.saldoInicial = el.saldoInicial;
        this.objectJson.estado = el.estado;
        this.objectJson.saldoBackup = this.objectJson.saldoDisponible = el.saldoInicial;
        
      }
    });
  };


  validateValues(): void{
    if (this.objectJson.movimiento !== null) {
      // Usar el backup del saldo disponible si el campo de movimiento está vacío
      const movimiento = this.objectJson.movimiento || 0;
      this.objectJson.saldoDisponible = (this.objectJson.saldoBackup - movimiento < 0) ? parseInt(this.objectJson.saldoBackup) - parseInt(movimiento) : parseInt(this.objectJson.saldoBackup) + parseInt(movimiento) ;
      if(this.objectJson.saldoDisponible<0){
        this.toastr.error("No puedes realizar más débitos");
      }
    } else {
      this.objectJson.saldoDisponible = this.objectJson.saldoBackup;
    }
  };


  getDataAccounts(): void{
    this.accountService.getAccounts().subscribe((data: any[]) =>{
      if(data!==null){        
        data.forEach(el=>{
          this.clientList.forEach(element => {
            if(element.clienteId == el.clientId){
              el.clientName = element.nombre;
            }
          });
        });
        this.accountsList = data;
      }
    })
  };

  getData(): void{
    this.accountService.getAccounts().subscribe((data: any[])=>{
      if(data!==null){
        data.forEach(el=>{
          el.isEditing = false;
          this.clientList.forEach(element => {
            if(element.clienteId == el.clientId){
              el.clientName = element.nombre;
            }
          });
        });
        this.accountsList = data;
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


saveItem(): void{
if(this.objectJson.saldoDisponible<=0){
  this.toastr.warning('No puedes realizar el movimiento pues el saldo disponible es 0 o menor.','Aviso');
  if(!this.objectJson.estado)
  {
    this.toastr.error("La cuenta del cliente está inactiva.","Aviso");
  }
}else{
  //Save
  this.objectJson.id = this.accountsList.length+1;
  this.accountService.create(this.objectJson)
  .subscribe((data: any[]) =>{
    console.log(data);
    this.getData();
    this.showSuccess();
    this.objectJson={};
  this.creation=false;
  });
  
}

}

saveEdit(item:any): void{
this.accountService.modify(item.numeroCuenta, item)
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
// this.accountsList.push(newItem);
}





editItem(item: any): void{
 if(this.edition){
   this.edition = false;
   item.isEditing = false;
 }else{
  //  this.aux = Object.assign({},item);
   this.aux = {
    "numeroCuenta": item.numeroCuenta,
    "saldoInicial": item.saldoInicial,
    "tipoCuenta": item.tipoCuenta,
    "estado": item.estado,
    "clientId": item.clientId,
   }
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
  this.accountsList.forEach(el=>{
    // el = {
    //   "id": 0,
    //   "name": this.aux.name,
    //   "address":  this.aux.address,
    //   "phoneNumber":  this.aux.phoneNumber,
    //   "password":  this.aux.password,
    //   "status": this.aux.status,
    // } Some Bug Founded with the Assign Backup Info
    if(el.numeroCuenta===item.numeroCuenta){
      el.numeroCuenta = this.aux.numeroCuenta;
      el.tipoCuenta = this.aux.tipoCuenta;
      el.clientId = this.aux.clienteId;
      el.saldoInicial = this.aux.saldoInicial;
      el.estado = this.aux.estado;
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
this.accountService.delete(index)
  .subscribe((data: any) => {
    this.getData();
    this.showError();
  });
}

ngOnInit(){
this.getDataClients();
this.getData();
this.objectJson = {
  "clientId": 0,
  "numeroCuenta": "",
  "tipoCuenta": "",
  "saldoInicial": "",
  "saldoDisponible": "",
  "estado": false,
}
}
}
