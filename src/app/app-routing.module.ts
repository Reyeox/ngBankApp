import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from "./clients/clients.component";
import { AccountsComponent } from "./accounts/accounts.component";
import { MovementsComponent } from "./movements/movements.component";
import { ReportsComponent } from "./reports/reports.component";

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
