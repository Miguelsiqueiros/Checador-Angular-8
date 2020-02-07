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
      return this.httpClient.post(`${environment.apiUrl}users/checkin`, { pin: pin });
  }

  registerName(newUser: User) {
      return this.httpClient.post(`${environment.apiUrl}users/create`, newUser);
  }

  weeklyDatasource() {
      return this.httpClient.get(`${environment.apiUrl}users/weekly-ladder`);
  }

  dailyDatasource() {
      return this.httpClient.get(`${environment.apiUrl}users/daily-ladder`);
  }

}
