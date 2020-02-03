import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pto } from '../Models/pto'
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class PtoService {

  constructor(private httpClient: HttpClient, private logger: NGXLogger) { }

  newPto(ptoData: Pto) {
    if (environment.production == true) {
      return this.httpClient.post(`${environment.apiUrl}/methodName`, ptoData);
    }
    else {
      return this.httpClient.post(`${environment.apiUrl}/methodName`, ptoData);
    }
  }

}
