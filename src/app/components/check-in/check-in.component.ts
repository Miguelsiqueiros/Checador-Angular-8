import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CheckInService } from 'src/app/Services/checkIn.service';
import { CdkTable } from '@angular/cdk/table';
import { RankingComponent } from '../ranking/ranking.component';
import { AlertsService } from 'src/app/Services/alerts.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent implements OnInit {
  constructor(private _snackBar: MatSnackBar, private checkInObject: CheckInService, private RanTable: RankingComponent, private alerts:AlertsService) { }
  pinValue: number;
  time = new Date();
  responseJson: any;
  ngOnInit() {
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  SubmitData() {
    this.checkInObject.checkIn(this.pinValue).subscribe(response => {
      this.responseJson = response;
      this.alerts.AlertMessage(this.responseJson.info, this.responseJson.type)
      this.RanTable.Refresh();
    }, error => {
      this.alerts.AlertMessage(this.responseJson.info, this.responseJson.type)
    });
    this.pinValue = null;
  }


  AlertMessage(alertMessage: string, alertType: string) {
    var time;
    var dismiss;
    if (alertType == "warning" || alertType == "error") {
      dismiss = ""
      time = 2000
    } else if (alertType == "success") {
      dismiss = "";
      time = 3000;
    } else if (alertType == "info") {
      dismiss = "Got it!";
      time = 10000;
    }
    this._snackBar.open(alertMessage, dismiss, {
      duration: time,
      verticalPosition: 'top',
      panelClass: alertType + '-snackbar',
    })
  }

}
