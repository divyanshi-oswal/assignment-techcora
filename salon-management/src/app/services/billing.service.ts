import { Injectable } from '@angular/core';
import { Bill } from '../models/bill.model';
import { EmployeeService } from './employee.service';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  bills: Bill[] = [];

  constructor(private employeeService: EmployeeService) {}

  addBill(employeeId: number, amount: number) {
    const newBill: Bill = {
      id: this.bills.length + 1,
      employeeId,
      amount,
      date: new Date().toISOString()
    };
    this.bills.push(newBill);
    this.employeeService.updateAchieved(employeeId, amount);
  }

  getBills() {
    return this.bills;
  }
}
