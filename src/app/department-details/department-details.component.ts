import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from '../services/department.service';
import { Department } from '../models/department';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css']
})
export class DepartmentDetailsComponent implements OnInit {

  departmentFrom:FormGroup;
  department:Department;

  constructor(private fb: FormBuilder, private departmentService: DepartmentService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.buildDepartmentForm();
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.departmentService.getDepartment(Number.parseInt(params.get('id')))
      )
    ).subscribe((department: Department) => {
      this.department = department;
      this.departmentFrom.get('id').setValue(department.id);
      this.departmentFrom.get('depName').setValue(department.depName);
    });
  }

  buildDepartmentForm() {
    this.departmentFrom = this.fb.group({
      id: [''],
      depName: ['', [Validators.required]],
    });
  }

  postDepartment(){
    let departmentToPost = new Department();
    departmentToPost.depName = this.departmentFrom.get('depName').value;
    if (this.departmentFrom.get('id').value) {
      departmentToPost.id = this.departmentFrom.get('id').value;
      this.departmentService.updateDepartment(departmentToPost).subscribe(() => {
        this.router.navigate(['/department']);
      },
        error => {
          console.log(error)
        });
    } else {
      departmentToPost.id = 0;
      this.departmentService.postDepartment(departmentToPost).subscribe(() => {
        this.router.navigate(['/department']);
      },
        error => {
          console.log(error)
        });
    }
  }
}
