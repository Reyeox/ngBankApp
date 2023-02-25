import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { MovementsComponent } from './movements/movements.component';
import { ReportsComponent } from './reports/reports.component';
import { AppRoutingModule } from './app-routing.module';
import { AccountsComponent } from './accounts/accounts.component';
import { FilterPipe } from "./pipes/filter.pipe";

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    MovementsComponent,
    ReportsComponent,
    AccountsComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
