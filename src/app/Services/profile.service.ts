import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Profile } from 'selenium-webdriver/firefox';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) { }

  getProfile(pin: number) {
    return this.httpClient.post(`${environment.apiUrl}users/methodname`, { pin: pin });
  }

  saveProfileChanges(profileChanges: Profile){
    return this.httpClient.post(`${environment.apiUrl}users/methodname`, profileChanges);
  }

}
