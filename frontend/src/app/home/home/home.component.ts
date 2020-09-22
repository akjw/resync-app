import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';


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
export class HomeComponent implements OnInit {
  stats: Stats

  constructor(private authService: AuthService,) { }

  ngOnInit(): void {
    this.authService.getStats().subscribe((data) => {
      this.stats = data.stats;
    })
  }

}
