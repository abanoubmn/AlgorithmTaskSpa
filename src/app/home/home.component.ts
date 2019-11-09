import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  employees: Employee[];
  unfilteredEmployees: Employee[];
  filterString: string = '';
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe((employees: Employee[]) => {
      this.employees = employees;
      this.unfilteredEmployees = employees;
    });
  }

  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete?'))
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.getEmployees();
      });
  }

  filter() {
    let wordCount = this.filterString.split(' ').length;
    let words = this.filterString.toUpperCase().split(' ');

    if (wordCount)
      this.employees = this.unfilteredEmployees.filter((i) => {
        let matchCount = 0;
        for (let j = 0; j < wordCount; j++) {
          if (i.firstName.toUpperCase().indexOf(words[j]) > -1 || i.lastName.toUpperCase().indexOf(words[j]) > -1)
            matchCount++;
        }

        return wordCount == matchCount;
      });
    else
      this.employees = this.unfilteredEmployees;
  }
}
