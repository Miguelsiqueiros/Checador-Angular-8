import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../Models/user'
import { ok } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class CheckInService {

  constructor(private httpClient: HttpClient) { }

  checkIn(pin: number) {
    if(environment.production == true){
    return this.httpClient.post(`${environment.apiUrl}users/checkin`, {pin:pin});
    }
    else{
      
    }
  }

  registerName(newUser: User) {
    if(environment.production == true){
      return this.httpClient.post(`${environment.apiUrl}users/create`, newUser);
    }
    else{

    }
  }

  weeklyDatasource() {
    if (environment.production == true) {
      return this.httpClient.get(`${environment.apiUrl}users/weekly-ladder`);
    }
    else {
      return this.httpClient.get(`http://localhost:3000/weekly`);
    }
  }


  dailyDatasource() {
    if (environment.production == true) {
      return this.httpClient.get(`${environment.apiUrl}users/daily-ladder`);
    }
    else {
      return this.httpClient.get(`http://localhost:3000/daily`);
    }
  }

}
