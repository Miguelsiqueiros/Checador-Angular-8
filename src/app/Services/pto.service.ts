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
      this.logger.info("Attempt to create new PTO " + Pto + "(POST in Production)");
      return this.httpClient.post(`${environment.apiUrl}/methodName`, ptoData);
    }
    else {
      this.logger.info("Attempt to create new PTO " + Pto + "(POST in Development)");
      return this.httpClient.post(`${environment.apiUrl}/methodName`, ptoData);
    }
  }

}
