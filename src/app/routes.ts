import { Routes } from '@angular/router';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { DepartmentComponent } from './department/department.component';
import { DepartmentDetailsComponent } from './department-details/department-details.component';
import { HomeComponent } from './home/home.component';

export const appRoutes:Routes=[{path:'employee-details',component:EmployeeDetailsComponent},
{path:'employee-details/:id',component:EmployeeDetailsComponent},
{path:'department-details/:id',component:DepartmentDetailsComponent},
{path:'department-details',component:DepartmentDetailsComponent},
{path:'department',component:DepartmentComponent},
{path:'',component:HomeComponent},
{path: '**', redirectTo: '', pathMatch: 'full'}];