import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { PtoService } from "src/app/Services/pto.service";
import { Pto } from "../../Models/pto";
import { AlertsService } from "src/app/Services/alerts.service";
import { NGXLogger } from "ngx-logger";
import { MatStepper } from "@angular/material";

@Component({
  selector: "app-CreatePTO",
  templateUrl: "./CreatePTO.component.html",
  styleUrls: ["./CreatePTO.component.css"],
  //this may be important to consider if alerts don't work because of the new service
  encapsulation: ViewEncapsulation.None
})
export class CreatePTOComponent implements OnInit {
  pin: number;
  selectedDate: boolean;
  pto: Pto;
  @ViewChild(MatStepper, { static: false }) matStepper: MatStepper;

  constructor(
    private ptoService: PtoService,
    private alertService: AlertsService,
    private logger: NGXLogger
  ) {}
  ngOnInit() {
    this.pto = new Pto();
  }

  Submit() {
    this.pto.pin = this.pin;
    this.pto.day = this.selectedDate;
    this.ptoService.Create(this.pto).subscribe(
      response => {
        this.alertService.alertMessage(response["info"], response["type"]);
      },
      error => {
        this.logger.debug(error);
        this.alertService.alertMessage(error["info"], error["type"]);
      }
    );
  }
}
