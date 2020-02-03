import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../Models/user'
import { ok } from 'assert';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class CheckInService {

  constructor(private httpClient: HttpClient, private logger: NGXLogger) { }

  checkIn(pin: number) {
    if (environment.production == true) {
      return this.httpClient.post(`${environment.apiUrl}users/checkin`, { pin: pin });
    }
    else {
      return this.httpClient.post(`${environment.apiUrl}users/checkin`, { pin: pin });
    }
  }

  registerName(newUser: User) {
    if (environment.production == true) {
      return this.httpClient.post(`${environment.apiUrl}users/create`, newUser);
    }
    else {
      return this.httpClient.post(`${environment.apiUrl}users/create`, newUser);
    }
  }

  weeklyDatasource() {
    if (environment.production == true) {
      return this.httpClient.get(`${environment.apiUrl}users/weekly-ladder`);
    }
    else {
      return this.httpClient.get(`${environment.apiUrl}users/weekly-ladder`);
    }
  }


  dailyDatasource() {
    if (environment.production == true) {
      return this.httpClient.get(`${environment.apiUrl}users/daily-ladder`);
    }
    else {
      return this.httpClient.get(`${environment.apiUrl}users/daily-ladder`);
    }
  }

}
