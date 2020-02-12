import { CreatePTOComponent } from "./CreatePTO.component";
import { TestBed, ComponentFixture } from "@angular/core/testing";
import { LoggerModule, NgxLoggerLevel } from "ngx-logger";
import {
  MatButtonModule,
  MatStepperModule,
  MatRadioModule,
  MatSnackBarModule,
  MatInputModule
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PtoService } from "src/app/Services/pto.service";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { environment } from "src/environments/environment";
import { AlertsService } from "src/app/Services/alerts.service";

describe("Test PTO Component", () => {
  let fixture: ComponentFixture<CreatePTOComponent>;
  let ptoComponent: CreatePTOComponent;
  let ptoHtml: HTMLElement;
  let httpMock: HttpTestingController;
  let alertService: AlertsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePTOComponent],
      imports: [
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatStepperModule,
        FormsModule,
        MatSnackBarModule,
        MatRadioModule,
        HttpClientModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        LoggerModule.forRoot({
          serverLoggingUrl: "/api/logs",
          level: NgxLoggerLevel.DEBUG,
          serverLogLevel: NgxLoggerLevel.ERROR
        })
      ],
      providers: [PtoService, AlertsService]
    }).compileComponents();
    fixture = TestBed.createComponent(CreatePTOComponent);
    ptoComponent = fixture.debugElement.componentInstance;
    ptoHtml = fixture.debugElement.nativeElement;
    httpMock = TestBed.get(HttpTestingController);
    fixture.detectChanges();
  });
  it("Should display PTO component", () => {
    expect(ptoComponent).toBeTruthy();
  });
  it('Should display a header with the title "Create PTO"', () => {
    const expectedH1Text = "Create a PTO";
    const ptoHeaderText = ptoHtml.querySelector("#ptoComponentTitle").innerHTML;
    expect(ptoHeaderText).toBe(expectedH1Text);
  });
  it("PTO should have three steps", () => {
    const numberOfSteps: number = ptoHtml.querySelectorAll(".mat-step").length;
    expect(numberOfSteps).toBe(3);
  });
  it('Step #1 should have a title with the text "Fill out your PIN"', () => {
    const stepHeaderText: string = ptoHtml.querySelector(".mat-step-text-label")
      .innerHTML;
    expect(stepHeaderText).toBe("Fill out your PIN");
  });
  it('Step #1 content should display an input with a placeholder text of "*PIN" and a button with the title next', () => {
    const stepOneContent: Element = ptoHtml.querySelector(
      ".mat-vertical-content"
    );
    const input: HTMLInputElement = ptoHtml.querySelector("mat-form-field");
    const button: HTMLButtonElement = ptoHtml.querySelector(
      "#stepOneNextButton"
    );
    const hasInput: boolean = stepOneContent.contains(input);
    const hasButton: boolean = stepOneContent.contains(button);
    expect(hasInput).toBeTruthy();
    expect(hasButton).toBeTruthy();
    expect(input.textContent).toBe("PIN *");
    expect(button.textContent).toBe("Next");
  });
  it("Step #2 content should be displayed when step #1 button is clicked", () => {
    const stepOneButton: HTMLButtonElement = ptoHtml.querySelector(
      "#stepOneNextButton"
    );
    stepOneButton.click();
    const stepTwoContent: Element = ptoHtml.querySelectorAll(
      ".mat-vertical-content"
    )[2];
    expect(stepTwoContent).toBeTruthy();
  });
  it('Step #2 content should display two selectable options(yesterday and today) and two buttons to move between steps that have the text "back" and "next"', () => {
    const stepTwoContent = ptoHtml.querySelectorAll(".mat-vertical-content")[1];
    const backButton: HTMLButtonElement = ptoHtml.querySelector(
      "#stepTwoPreviousButton"
    );
    const nextButton: HTMLButtonElement = ptoHtml.querySelector(
      "#stepTwoNextButton"
    );
    const radioGroup: HTMLInputElement = ptoHtml.querySelector(
      "#dateOptionsRadioGroup"
    );
    const yesterdayOption: Element = ptoHtml.querySelector("#yesterdayOption");
    const todayOption: Element = ptoHtml.querySelector("#todayOption");
    const hasBackButton: boolean = stepTwoContent.contains(backButton);
    const hasNextButton: boolean = stepTwoContent.contains(nextButton);
    const hasRadioGroup: boolean = stepTwoContent.contains(radioGroup);
    const hasYesterdayOption: boolean = radioGroup.contains(yesterdayOption);
    const hasTodayOption: boolean = radioGroup.contains(todayOption);
    expect(hasBackButton).toBeTruthy();
    expect(hasNextButton).toBeTruthy();
    expect(hasRadioGroup).toBeTruthy();
    expect(hasYesterdayOption).toBeTruthy();
    expect(hasTodayOption).toBeTruthy();
  });
  it("Step #3 content should be displayed when step #3 next button is clicked", () => {
    const nextButton: HTMLButtonElement = ptoHtml.querySelector(
      "#stepTwoNextButton"
    );
    nextButton.click();
    const stepThreeContent: Element = ptoHtml.querySelectorAll(
      ".mat-vertical-content"
    )[2];
    expect(stepThreeContent).toBeTruthy();
  });
  it('Step #3 content should display a button with the text "Finish PTO"', () => {
    const stepThreeContent: Element = ptoHtml.querySelectorAll(
      ".mat-vertical-content"
    )[2];
    const finishPtoButton: HTMLButtonElement = ptoHtml.querySelector("#submit");
    const finishPtoButtonSpan = finishPtoButton.children[0];
    const buttonText: string = finishPtoButtonSpan.innerHTML;
    const hasFinishPtoButton: boolean = stepThreeContent.contains(
      finishPtoButton
    );
    expect(hasFinishPtoButton).toBeTruthy();
    expect(buttonText).toBe(" Finish PTO ");
  });
  it("Step #3 should submit the form when the user clicks the finish PTO button", () => {
    const mockData = {
      status: "succesful",
      data: [],
      message: null
    };
    const mockResponse = { status: 201, statusText: "Created" };
    const submitMethod = spyOn(ptoComponent, "Submit").and.callThrough();
    alertService = TestBed.get(AlertsService);
    const displayAlertMethod = spyOn(
      alertService,
      "alertMessage"
    ).and.callThrough();
    const pin = ptoComponent.ptoFormGroup.controls.pin;
    pin.setValue(1000);
    const date = ptoComponent.ptoFormGroup.controls.date;
    date.setValue(false);
    ptoComponent.Submit();
    const request = httpMock.expectOne(`${environment.apiUrl}users/pto`);
    request.flush(mockData, mockResponse);
    httpMock.verify();
    expect(submitMethod).toHaveBeenCalled();
    expect(displayAlertMethod).toHaveBeenCalled();
  });
  it("Step #3 should not create a PTO if the pin is empty when the user clicks the submit button", () => {
    const date = ptoComponent.ptoFormGroup.controls.date;
    date.setValue(false);
    const form = ptoComponent.ptoFormGroup.valid;
    expect(form).toBeFalsy();
    const submitMethod = spyOn(ptoComponent, "Submit").and.callThrough();
    ptoComponent.Submit();
    expect(submitMethod).toHaveBeenCalled();
    httpMock.expectNone(`${environment.apiUrl}users/pto)`);
  });
  it("Step #3 should not create a PTO if the pin is not a number", () => {
    const date = ptoComponent.ptoFormGroup.controls.date;
    date.setValue(false);
    const pin = ptoComponent.ptoFormGroup.controls.pin;
    const invalidPin = "asdasdas";
    pin.setValue(invalidPin);
    const form = ptoComponent.ptoFormGroup.valid;
    expect(form).toBeFalsy();
    const submitMethod = spyOn(ptoComponent, "Submit").and.callThrough();
    ptoComponent.Submit();
    expect(submitMethod).toHaveBeenCalled();
    httpMock.expectNone(`${environment.apiUrl}users/pto)`);
  });
  it("Step #3 should not create a PTO if the pin is not between 1000 and 9999", () => {
    const date = ptoComponent.ptoFormGroup.controls.date;
    date.setValue(false);
    const pin = ptoComponent.ptoFormGroup.controls.pin;
    const invalidPin = 100;
    pin.setValue(invalidPin);
    const form = ptoComponent.ptoFormGroup.valid;
    expect(form).toBeFalsy();
    const submitMethod = spyOn(ptoComponent, "Submit").and.callThrough();
    ptoComponent.Submit();
    expect(submitMethod).toHaveBeenCalled();
    httpMock.expectNone(`${environment.apiUrl}users/pto)`);
  });
  it("Step #3 should not create a PTO if the user does not select a day", () => {
    const pin = ptoComponent.ptoFormGroup.controls.pin;
    const validPin = 9999;
    pin.setValue(validPin);
    const form = ptoComponent.ptoFormGroup.valid;
    expect(form).toBeFalsy();
    const submitMethod = spyOn(ptoComponent, "Submit").and.callThrough();
    ptoComponent.Submit();
    expect(submitMethod).toHaveBeenCalled();
    httpMock.expectNone(`${environment.apiUrl}users/pto)`);
  });
});
