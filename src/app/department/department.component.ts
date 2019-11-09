import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../services/department.service';
import { Department } from '../models/department';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  departments: Department[];
  constructor(private departmentService: DepartmentService) { }

  ngOnInit() {
    this.getDepartments();
  }

  getDepartments() {
    this.departmentService.getDepartments().subscribe((departments: []) => {
      this.departments = departments;
    });
  }

  deleteDepartment(id: number) {
    if (confirm('Are you sure you want to delete?'))
      this.departmentService.deleteDepartment(id).subscribe(() => {
        this.getDepartments();
      });
  }
}
