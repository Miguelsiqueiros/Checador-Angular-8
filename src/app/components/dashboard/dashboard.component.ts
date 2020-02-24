import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from '../../Services/dashboard.service';
import { lazyAndBestUser } from '../../Models/lazyAndBest';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  titles = ["Losers", "Winners", "Average"];
  losers: lazyAndBestUser[] = [];
  bests: lazyAndBestUser[] = [];
  average: String;
  weekNumber: Number;
  private losersSub: Subscription;
  private bestsSub: Subscription;
  private averageSub: Subscription;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.weekNumber = this.getNumberOfWeek(new Date());
    this.dashboardService.getLosers(this.weekNumber);
    this.losersSub = this.dashboardService.getLosersUpdateListener()
    .subscribe((losers: lazyAndBestUser[]) => {
      this.losers = losers;
    });

    this.dashboardService.getBests(this.weekNumber);
    this.bestsSub = this.dashboardService.getBestsUpdateListener()
    .subscribe((bests: lazyAndBestUser[]) => {
      this.bests = bests;
    });

    this.dashboardService.getAverage(this.weekNumber);
    this.averageSub = this.dashboardService.getAverageUpdateListener()
    .subscribe((average: Number) => {
      this.average = `${average.toString()} minutes`;
    })

}

  getNumberOfWeek(date: Date){
    return moment(moment(date).format('M/D/YYYY')).isoWeek();
  }
}