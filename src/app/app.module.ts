import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartmentComponent } from './department/department.component';
import { DepartmentDetailsComponent } from './department-details/department-details.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';

@NgModule({
   declarations: [
      AppComponent,
      DepartmentComponent,
      DepartmentDetailsComponent,
      NavBarComponent,
      EmployeeDetailsComponent,
      HomeComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      ReactiveFormsModule,
      FormsModule,
      HttpClientModule,
      RouterModule.forRoot(appRoutes)
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
