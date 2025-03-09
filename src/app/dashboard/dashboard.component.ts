import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model'; 


@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  message = "Welcome to the Salon Management App!";
  totalEmployees: number = 0;
  monthlyRevenue: number = 0;
  topEmployee: Employee | null = null;

  constructor(private employeeService: EmployeeService) {
    this.loadDashboardData();
  }

  loadDashboardData() {
    try {
      const employees = this.employeeService.getEmployees();
      this.totalEmployees = employees.length;
      this.monthlyRevenue = employees.reduce((total: any, emp: { achieved: any; }) => total + emp.achieved, 0);
      this.topEmployee = employees.reduce((prev: { achieved: number; }, curr: { achieved: number; }) => (prev.achieved > curr.achieved ? prev : curr), employees[0]);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  }

  refreshData() {
    this.loadDashboardData();
  }
}

