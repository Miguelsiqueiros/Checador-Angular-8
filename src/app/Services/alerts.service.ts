import { Injectable, Renderer2 } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {

  constructor(private _snackBar: MatSnackBar, private logger: NGXLogger) { }

  alertMessage(alertMessage: string, alertType: string) {
    var time;
    var dismiss;
    if (alertType == "warning" || alertType == "error") {
      dismiss = "Got it!"
      time = 2000
    } else if (alertType == "success") {
      dismiss = "Close";
      time = 3000;
    } else if (alertType == "info") {
      dismiss = "Got it!";
      time = 10000;
    }
    
    this.logger.info("Response alert with Info: '" + alertMessage + "', of type '" + alertType + ", with a duration of " + time + " milliseconds");

    return this._snackBar.open(alertMessage, dismiss, {
      duration: time,
      verticalPosition: 'top',
      panelClass: alertType + '-snackbar',
    })
  }
}
