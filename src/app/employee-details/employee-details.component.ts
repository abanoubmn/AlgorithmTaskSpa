import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, min } from 'rxjs/operators';
import { DepartmentService } from '../services/department.service';
import { Employee } from '../models/employee';
import { Department } from '../models/department';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  employeeForm: FormGroup;
  employee: Employee;
  departments: Department[];

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private departmentService: DepartmentService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getDepartments();
    this.buildEmployeeForm();
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.employeeService.getEmployee(Number.parseInt(params.get('id')))
      )
    ).subscribe((employee: Employee) => {
      this.employee = employee;
      this.employeeForm.get('id').setValue(employee.id);
      this.employeeForm.get('firstName').setValue(employee.firstName);
      this.employeeForm.get('lastName').setValue(employee.lastName);
      this.employeeForm.get('dateOfBirth').setValue(employee.dateOfBirth.substring(0, 10));
      this.employeeForm.get('departmentId').setValue(employee.departmentId);
      this.employeeForm.get('isManager').setValue(employee.isManager);
    });
  }

  buildEmployeeForm() {
    this.employeeForm = this.fb.group({
      id: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      isManager: [''],
      departmentId: ['', [Validators.required]]
    });
    this.employeeForm.get('isManager').setValue(false);
  }

  postEmployee() {
    let employeeToPost = new Employee();
    employeeToPost.firstName = this.employeeForm.get('firstName').value;
    employeeToPost.lastName = this.employeeForm.get('lastName').value;
    employeeToPost.dateOfBirth = this.employeeForm.get('dateOfBirth').value;
    employeeToPost.isManager = this.employeeForm.get('isManager').value;
    employeeToPost.departmentId = Number.parseInt(this.employeeForm.get('departmentId').value);

    if (this.employeeForm.get('id').value) {
      employeeToPost.id = this.employeeForm.get('id').value;
      this.employeeService.updateEmployee(employeeToPost).subscribe(() => {
        this.router.navigate(['/']);

      },
        error => {
          if (error.error.error == 'hasManager')
            alert('A department can only have 1 manager!')
          else
            alert('Employee was not saved, try again!');
        });
    } else {
      employeeToPost.id = 0;
      this.employeeService.postEmployee(employeeToPost).subscribe(() => {
        this.router.navigate(['/']);
      },
        error => {
          if (error.error.error == 'hasManager')
            alert('A department can only have 1 manager!');
          else
            alert('Employee was not saved, try again!');
        });
    }
  }

  getDepartments() {
    this.departmentService.getDepartments().subscribe((departments: []) => {
      this.departments = departments;
    });
  }

  isManagerChange(isChecked) {
    this.employeeForm.get('isManager').setValue(isChecked);
  }
}
