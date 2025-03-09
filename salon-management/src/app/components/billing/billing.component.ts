import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent {
  employeeId: number = 1;
  amount: number = 0;

  constructor(private employeeService: EmployeeService) {}

  addBill() {
    if (this.amount > 0) {
      this.employeeService.updateEmployeeTarget(this.employeeId, this.amount);
      alert('Bill added successfully!');
      this.amount = 0;  // Reset input field
    }
  }
}
