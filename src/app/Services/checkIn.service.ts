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
    return this.httpClient.post(`${environment.apiUrl}users/checkin`, {pin:pin});
  }

  registerName(newUser: User) {
      return this.httpClient.post(`${environment.apiUrl}users/create`, newUser);
  }

  weeklyDatasource() {
    if (environment.production == true) {
      return this.httpClient.get(`${environment.apiUrl}users/weekly-ladder`);
    }
    else {
      var DATA = [
        { name: 'Antonio Nevarez', totalMinutes: 0 },
        { name: 'Miguel Siqueiros', totalMinutes: 15 },
        { name: 'Carlos Rondero', totalMinutes: 26 },
        { name: 'Ernesto Vera', totalMinutes: 39 },
        { name: 'Luis Maldonado', totalMinutes: 52 },
        { name: 'Felipe Padilla', totalMinutes: 62 },
        { name: 'Jesus Campos', totalMinutes: 68 },
        { name: 'Pedro Esparza', totalMinutes: 76 },
        { name: 'Jemmy Preciado', totalMinutes: 83 },
        { name: 'Alfa Venegas', totalMinutes: 92 },
      ];
      return DATA;
    }
  }


  dailyDatasource() {
    if (environment.production == true) {
      return this.httpClient.get(`${environment.apiUrl}users/daily-ladder`);
    }
    else {
      var DATA = [
        { name: 'Antonio Nevarez', totalMinutes: 0, pto: false },
        { name: 'Jemmy Preciado', totalMinutes: 1, pto: false },
        { name: 'Ernesto Vera', totalMinutes: 2, pto: false },
        { name: 'Carlos Rondero', totalMinutes: 3, pto: false },
        { name: 'Jesus Campos', totalMinutes: 5, pto: true },
        { name: 'Felipe Padilla', totalMinutes: 6, pto: false },
        { name: 'Luis Maldonado', totalMinutes: 6, pto: false },
        { name: 'Pedro Esparza', totalMinutes: 7, pto: false },
        { name: 'Miguel Siqueiros', totalMinutes: 8, pto: false },
        { name: 'Alfa Venegas', totalMinutes: 9, pto: false },
      ];
      return DATA;
    }
  }

}
