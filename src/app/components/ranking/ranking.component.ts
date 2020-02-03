import { Component, OnInit } from '@angular/core';
import { CheckInService } from 'src/app/Services/checkIn.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'totalMinutes'];
  dataSource: any;
  toggle: boolean = false;

  constructor(private records: CheckInService, private logger: NGXLogger) { }
  title: string;

  ngOnInit() {
    if (this.toggle == true) {
      this.title = "Weekly Ranking";      
      this.dataSource = this.records.weeklyDatasource().subscribe(error=>{
        this.logger.debug(error);
      });      
    }
    else {
      this.title = "Daily Ranking";
      this.dataSource = this.records.dailyDatasource().subscribe(error=>{
        this.logger.debug(error);
      });
    }
  }

  toggleRanking() {
    this.toggle = !this.toggle;
    this.ngOnInit();
  }

  Refresh(){
    this.ngOnInit();
  }

 

  
}
