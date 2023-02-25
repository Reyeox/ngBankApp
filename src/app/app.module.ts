import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";

import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { MovementsComponent } from './movements/movements.component';
import { ReportsComponent } from './reports/reports.component';
import { AppRoutingModule } from './app-routing.module';
import { AccountsComponent } from './accounts/accounts.component';
import { FilterPipe } from "./pipes/filter.pipe";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

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
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ToastrModule.forRoot(), // Toastr Messages
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
