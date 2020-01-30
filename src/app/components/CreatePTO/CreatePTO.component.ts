import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Type } from '@angular/compiler';
import { stringify } from '@angular/compiler/src/util';
import { Button } from 'protractor';
import { PtoService } from 'src/app/Services/pto.service';
import { Pto } from 'src/app/Models/pto';
import { AlertsService } from 'src/app/Services/alerts.service';

@Component({
  selector: 'app-CreatePTO',
  templateUrl: './CreatePTO.component.html',
  styleUrls: ['./CreatePTO.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class CreatePTOComponent implements OnInit {
  pinValue: number;
  selection: number;
  model:Pto;
  responseJson: any;


  constructor(private _snackBar: MatSnackBar, private ptoObject: PtoService, private alerts: AlertsService) { }
  ngOnInit() {
    this.model = new Pto();
  }

  Submit() {
    this.model.pin = this.pinValue;
    this.model.day = this.selection;
    this.ptoObject.newPto(this.model).subscribe(response => {  
      this.responseJson = response;
      this.alerts.AlertMessage(this.responseJson.info, this.responseJson.type)
      }, error=>{
      this.alerts.AlertMessage(this.responseJson.info, this.responseJson.type)
      });
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
