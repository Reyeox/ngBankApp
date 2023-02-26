import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { ClientsComponent } from './components/clients/clients.component';
import { MovementsComponent } from './components/movements/movements.component';
import { ReportsComponent } from './components/reports/reports.component';
import { AppRoutingModule } from './app-routing.module';
import { AccountsComponent } from './components/accounts/accounts.component';
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
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot(), // Toastr Messages
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
