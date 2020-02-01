import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Type } from '@angular/compiler';
import { stringify } from '@angular/compiler/src/util';
import { Button } from 'protractor';
import { PtoService } from 'src/app/Services/pto.service';
import { Pto } from 'src/app/Models/pto';
import { AlertsService } from 'src/app/Services/alerts.service';
import { NGXLogger } from 'ngx-logger'

@Component({
  selector: 'app-CreatePTO',
  templateUrl: './CreatePTO.component.html',
  styleUrls: ['./CreatePTO.component.css'],
  //this may be important to consider if alerts don't work because of the new service
  encapsulation: ViewEncapsulation.None
})

export class CreatePTOComponent implements OnInit {
  pinValue: number;
  selection: number;
  model:Pto;
  responseJson: any;


  constructor(private _snackBar: MatSnackBar, private ptoObject: PtoService, private alerts: AlertsService, private logger: NGXLogger) { 
    
  }
  ngOnInit() {
    this.logger.debug("ngOnInit");
    this.model = new Pto();
  }

  Submit() {
    this.model.pin = this.pinValue;
    this.model.day = this.selection;
    this.ptoObject.newPto(this.model).subscribe(response => {  
      this.responseJson = response;
      this.alerts.alertMessage(this.responseJson.info, this.responseJson.type)
      }, error=>{
      this.alerts.alertMessage(this.responseJson.info, this.responseJson.type)
      });
  }
  
}
