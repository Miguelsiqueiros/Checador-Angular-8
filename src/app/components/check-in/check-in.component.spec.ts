import { CheckInComponent } from './check-in.component';
import { RankingComponent } from '../ranking/ranking.component';
import { TestBed, ComponentFixture } from "@angular/core/testing";
import { LoggerModule, NgxLoggerLevel } from "ngx-logger";
import {
    MatButtonModule,
    MatSnackBarModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule,
    MatTableModule
  } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {CheckInService } from "src/app/Services/checkIn.service";
import { HttpClientModule } from "@angular/common/http";
import {
    HttpClientTestingModule,
    HttpTestingController
  } from "@angular/common/http/testing";
import { environment } from "src/environments/environment";
import { AlertsService } from "src/app/Services/alerts.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe("Test Check-in Component", () => {
  let fixture: ComponentFixture<CheckInComponent>;
  let checkInComponent: CheckInComponent;
  let checkInHtml: HTMLElement;
  let httpMock: HttpTestingController;
  let alertService: AlertsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CheckInComponent,
        RankingComponent
      ],
      imports: [
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSlideToggleModule,
        MatTableModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        HttpClientModule,
        HttpClientTestingModule,
        LoggerModule.forRoot({
          serverLoggingUrl: "/api/logs",
          level: NgxLoggerLevel.DEBUG,
          serverLogLevel: NgxLoggerLevel.ERROR
      })
      ],
      providers: [
        CheckInService, 
        AlertsService, 
        RankingComponent
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(CheckInComponent);
    checkInComponent = fixture.debugElement.componentInstance;
    checkInHtml = fixture.debugElement.nativeElement;
    httpMock = TestBed.get(HttpTestingController);
    fixture.detectChanges();
  });
  it("Should display Check-in Component", () => {
    expect(CheckInComponent).toBeTruthy();
  });
  it("Should display a header with the current time", () => {
    let time = new Date();
    const expectedH1Text = time.toLocaleTimeString();
    const checkInHeaderText = checkInHtml.querySelector("#checkInComponentTitle").innerHTML.trim().startsWith("0") 
      ? checkInHtml.querySelector("#checkInComponentTitle").innerHTML.trim().substring(1)
      : checkInHtml.querySelector("#checkInComponentTitle").innerHTML.trim();
    expect(checkInHeaderText).toBe(expectedH1Text);
  });
  it('Should display an input with the placeholder text "Insert your PIN"', () => {
    const content: Element = checkInHtml;
    const input : HTMLInputElement = content.querySelector("mat-form-field");
    const hasInput: boolean = content.contains(input);
    expect(hasInput).toBeTruthy();
    expect(input.textContent).toBe("Insert your PIN");
  });
  it("Should display a button when 4 digits are typed", () => {
    checkInComponent.pinValue = 1000;
    fixture.detectChanges();
    const content: Element = checkInHtml;
    const button: HTMLButtonElement = content.querySelector("#submit");
    const hasButton: boolean = content.contains(button);
    expect(hasButton).toBeTruthy();
  });
  it("Should not display the button with 3 or less digits typed", () => {
    const content: Element = checkInHtml;
    const button: HTMLButtonElement = content.querySelector("#submit");
    const hasButton: boolean = content.contains(button);
    expect(hasButton).toBeFalsy();
  });
  it("Should submit the check-in when the button is clicked and the PIN is valid", () => {
    const mockData = {
      status: "succesful",
      data: [],
      message: null
    };
    const mockResponse = { status: 201, statusText: "Created" };
    const submitMethod = spyOn(checkInComponent, "SubmitData").and.callThrough();
    alertService = TestBed.get(AlertsService);
    const displayAlertMethod = spyOn(
      alertService,
      "alertMessage"
    ).and.callThrough();
    checkInComponent.pinValue = 1000;
    checkInComponent.SubmitData();
    const request =  httpMock.expectOne(`${environment.apiUrl}users/checkin`);
    request.flush(mockData, mockResponse);
    const get =  httpMock.expectOne(`${environment.apiUrl}users/daily-ladder`);
    const mockResponseGet = { status: 200, statusText: "OK"};
    get.flush(mockData, mockResponseGet);
    httpMock.verify();
    expect(submitMethod).toHaveBeenCalled();
    expect(displayAlertMethod).toHaveBeenCalled();
  });
});