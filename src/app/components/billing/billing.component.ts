import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee.model';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent {
  employeeId: number = 1;
  amount: number = 0;

  employees: Employee[] = [
    { id: 1, name: 'Sarath', target: 100000, achieved: 0 },
    { id: 2, name: 'Aarav', target: 80000, achieved: 0 }
  ];

  constructor(private employeeService: EmployeeService) {}

  addBill() {
    if (this.amount > 0) {
      this.employeeService.updateEmployeeTarget(this.employeeId, this.amount);
      alert('Bill added successfully!');
      this.amount = 0;  // Reset input field
    }
  }
}
