import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from "./components/clients/clients.component";
import { AccountsComponent } from "./components/accounts/accounts.component";
import { MovementsComponent } from "./components/movements/movements.component";
import { ReportsComponent } from "./components/reports/reports.component";

const routes: Routes = [
  { path: 'clients', component: ClientsComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: 'movements', component: MovementsComponent  },
  { path: 'reports', component: ReportsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
