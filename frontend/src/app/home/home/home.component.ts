import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Chart } from 'chart.js';
import { Label } from 'ng2-charts';
import { DeptService } from '../../departments/dept.service';
import { OrgService } from '../../organizations/org.service';
import { EmpService } from '../../employees/emp.service';


interface Stats {
  orgNum: number;
  deptNum: number;
  employeeNum: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild('monthChart', {static: true}) monthChart: ElementRef;
  @ViewChild('yearChart', {static: true}) yearChart: ElementRef;

  showMonth = true;

  stats: Stats
  orgMonth: number;
  deptMonth: number;
  empMonth: number;

  orgYear: number;
  deptYear: number;
  empYear: number;

  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  currentMonth = this.months[new Date().getMonth()]
  currentYear = new Date().getFullYear().toString()
  monthData: any;
  yearData: any;

  public barChartLabelsYear: Label[] = [this.currentYear];
  public barChartLabelsMonth: Label[] = [this.currentMonth];
 
  constructor(
    private authService: AuthService,  
    private deptService: DeptService,
    private orgService: OrgService,
    private empService: EmpService,
    private elementRef: ElementRef
    ) { }

  onClick() {
    this.showMonth = !this.showMonth;
  }

  ngOnInit(): void {

    //Fetch statistics
    this.authService.getStats().subscribe((data) => {
      this.stats = data.stats;
    })
    
    //Establish context for charts
    let monthContext = (<HTMLCanvasElement>this.monthChart.nativeElement).getContext('2d');
    let yearContext = (<HTMLCanvasElement>this.yearChart.nativeElement).getContext('2d');

    //Fetch data for all documents created this month 
    this.orgService.getMonthOrgs().subscribe((data) => {
      this.orgMonth = data.organizations
      this.deptService.getMonthDepts().subscribe((data) => {
        this.deptMonth = data.departments
          this.empService.getMonthEmps().subscribe((data) => {
            this.empMonth = data.employees
            //draw chart to display month data
              this.monthData = new Chart(monthContext, {
                type: 'bar',
                data: {
                  datasets: [
                  { data: [this.orgMonth], label: 'Organizations', backgroundColor: 'rgba(0, 181, 204, 1)'},
                  { data: [this.deptMonth], label: 'Departments', backgroundColor: 'rgba(30, 139, 195, 1)'},
                  { data: [this.empMonth], label: 'Employees', backgroundColor: 'rgba(137, 196, 244, 1)'}
                ],
                  labels: this.barChartLabelsMonth,
        
                },
                options: {
                  responsive: true,
                  legend: {
                    display: true
                  },
                  scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
                }
            })
          })
      })
    })

    //Fetch data for all documents created this year
    this.orgService.getYearOrgs().subscribe((data) => {
      this.orgYear = data.organizations
      this.deptService.getYearDepts().subscribe((data) => {
        this.deptYear = data.departments
          this.empService.getYearEmps().subscribe((data) => {
            this.empYear = data.employees
            //draw chart to display year data
              this.yearData = new Chart(yearContext, {
                type: 'bar',
                data: {
                  datasets: [
                  { data: [this.orgYear], label: 'Organizations', backgroundColor: 'rgba(0, 181, 204, 1)'},
                  { data: [this.deptYear], label: 'Departments', backgroundColor: 'rgba(30, 139, 195, 1)'},
                  { data: [this.empYear], label: 'Employees', backgroundColor: 'rgba(137, 196, 244, 1)'}
                ],
                  labels: this.barChartLabelsYear,
        
                },
                options: {
                  responsive: true,
                  legend: {
                    display: true
                  },
                  scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
                }
            })
          })
      })
    })
  }
}
