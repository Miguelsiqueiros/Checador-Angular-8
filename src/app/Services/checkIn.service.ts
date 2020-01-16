import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../Models/user'

@Injectable({
  providedIn: 'root'
})
export class CheckInService {

constructor(private httpClient: HttpClient) { }

checkIn(pin: string){
  let params = new HttpParams();
  params = params.append("pin", pin)
  return this.httpClient.post(`${environment.apiUrl}/methodName`, {params: params});
}

weeklyRanking(){
  return this.httpClient.get(`${environment.apiUrl}/methodName`);
}

dailyRanking(){
  return this.httpClient.get(`${environment.apiUrl}/methodName`);
}

registerName(newUser: User){
  return this.httpClient.post(`${environment.apiUrl}/methodName`, newUser);
}

}
