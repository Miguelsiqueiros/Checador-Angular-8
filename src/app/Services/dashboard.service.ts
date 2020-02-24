import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { lazyAndBestUser } from '../Models/lazyAndBest';
import { map } from 'rxjs/operators';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private losers: lazyAndBestUser[] = [];
  private losersUpdated = new Subject<lazyAndBestUser[]>();
  private bests: lazyAndBestUser[] = [];
  private average: Number;
  private bestsUpdated = new Subject<lazyAndBestUser[]>();
  private averageUpdated = new Subject<Number>();

  constructor(private httpClient: HttpClient) {
    
  }

  getLosers(week: Number) {
  this.httpClient
      .get<{ best: any; losers: any; average: Number}>(`${environment.apiUrl}dashboard/lazyandbest/${week}`)
      .pipe(
        map(lazyAndBestData => {
          return lazyAndBestData.losers.map(loser => {
            return {
              email: loser.email,
              minutes: loser.minutes,
              name: loser.name
            };
          });
        })
      )
      .subscribe(transformedLosers => {
        this.losers = transformedLosers;
        this.losersUpdated.next([...this.losers]);
      });
  }

  getLosersUpdateListener() {
    return this.losersUpdated.asObservable();
  }

  getBests(week: Number) {
    this.httpClient
        .get<{ best: any; losers: any; average: Number}>(`${environment.apiUrl}dashboard/lazyandbest/${week}`)
        .pipe(
          map(lazyAndBestData => {
            return lazyAndBestData.best.map(best => {
              return {
                email: best.email,
                minutes: best.minutes,
                name: best.name
              };
            });
          })
        )
        .subscribe(transformedbests => {
          this.bests = transformedbests;
          this.bestsUpdated.next([...this.bests]);
        });
    }
  
  
    getBestsUpdateListener() {
      return this.bestsUpdated.asObservable();
    }

    getAverage(week: Number) {
  
      this.httpClient
          .get<{ best: any; losers: any; average: Number}>(`${environment.apiUrl}dashboard/lazyandbest/${week}`)
          .pipe(
            map(lazyAndBestData => {
              return lazyAndBestData.average
            })
          )
          .subscribe(transformedaverage => {
            this.average = transformedaverage;
            this.averageUpdated.next(this.average);
          });
    }

    getAverageUpdateListener() {
      return this.averageUpdated.asObservable();
    }

}






