import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees = [
    { id: 1, name: 'Sarath', target: 100000, achieved: 0 },
    { id: 2, name: 'Aarav', target: 80000, achieved: 0 }
  ];

  getEmployees() {
    return this.employees;
  }

  
  updateAchieved(employeeId: number, amount: number) {
    const employee = this.employees.find(emp => emp.id === employeeId);
    if (employee) {
      employee.achieved += amount;
    }
  }
}
