import { RegisterComponent } from "./register.component";
import { TestBed, ComponentFixture } from "@angular/core/testing";
import { LoggerModule, NgxLoggerLevel } from "ngx-logger";
import {
    MatButtonModule,
    MatStepperModule,
    MatSnackBarModule,
    MatInputModule
  } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {CheckInService } from "src/app/Services/checkIn.service";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
    HttpClientTestingModule,
    HttpTestingController
  } from "@angular/common/http/testing";
import { environment } from "src/environments/environment";
import { AlertsService } from "src/app/Services/alerts.service";

describe("Test Register Component", () => {
    let fixture: ComponentFixture<RegisterComponent>;
    let registerComponent: RegisterComponent;
    let registerHtml: HTMLElement;
    let httpMock: HttpTestingController;
    let alertService: AlertsService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [RegisterComponent],
            imports: [
                BrowserAnimationsModule,
                MatInputModule,
                MatButtonModule,
                MatStepperModule,
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
            providers: [CheckInService, AlertsService]
        }).compileComponents();
        fixture = TestBed.createComponent(RegisterComponent);
        registerComponent = fixture.debugElement.componentInstance;
        registerHtml = fixture.debugElement.nativeElement;
        httpMock = TestBed.get(HttpTestingController);
        fixture.detectChanges();
    });
    it("Should display Register component", () => {
        expect(registerComponent).toBeTruthy();
    });
    it('Should display a header with the title "Register"', () => {
        const expectedH1Text = "Register";
        const registerHeaderText = registerHtml.querySelector("#registerComponentTitle").innerHTML;
        expect(registerHeaderText).toBe(expectedH1Text);
    });
    it("Register should have five steps", () => {
        const numberOfSteps: number = registerHtml.querySelectorAll(".mat-step").length;
        expect(numberOfSteps).toBe(5);
    });
    it('Step #1 should have a title with the text "Enter your Full name"', () => {
        const stepOneHeaderText: string = registerHtml.querySelectorAll(".mat-step-text-label")[0].innerHTML;
        expect(stepOneHeaderText).toBe("Enter your Full name");
    });
    it('Step #1 content should display an input with a placeholder text of "Full name*" and a button with the title next', () => {
        const stepOneContent: Element = registerHtml.querySelector(".mat-vertical-content");
        const input : HTMLInputElement = registerHtml.querySelector("mat-form-field");
        const button: HTMLButtonElement = registerHtml.querySelector("#stepOneNextButton");
        const hasInput: boolean = stepOneContent.contains(input);
        const hasButton: boolean = stepOneContent.contains(button);
        expect(hasInput).toBeTruthy();
        expect(hasButton).toBeTruthy();
        expect(input.textContent).toBe("Full name *");
        expect(button.textContent).toBe("Next");
    });
    it("Step #2 content should be displayed when step #1 next button is clicked", () => {
        const stepOneButton: HTMLButtonElement = registerHtml.querySelector("#stepOneNextButton");
        stepOneButton.click();
        const stepTwoContent: Element = registerHtml.querySelectorAll(".mat-vertical-content")[1];
        expect(stepTwoContent).toBeTruthy();
    });
    it('Step #2 should have a title with the text "Email address"', () => {
        const stepTwoHeaderText: string = registerHtml.querySelectorAll(".mat-step-text-label")[1].innerHTML;
        expect(stepTwoHeaderText).toBe("Email address");
    });
    it('Step #2 content should display an input with a placeholder text of "Email address*" and two buttons to move between steps that have the text "back" and "next"', () => {
        const stepTwoContent: Element = registerHtml.querySelectorAll(".mat-vertical-content")[1];
        const stepTwoInput : HTMLInputElement = stepTwoContent.querySelector("mat-form-field");
        const backButton: HTMLButtonElement = registerHtml.querySelector(
            "#stepTwoPreviousButton"
          );
          const nextButton: HTMLButtonElement = registerHtml.querySelector(
            "#stepTwoNextButton"
          );
        const hasInput: boolean = stepTwoContent.contains(stepTwoInput);
        const hasBackButton: boolean = stepTwoContent.contains(backButton);
        const hasNextButton: boolean = stepTwoContent.contains(nextButton);
        expect(hasInput).toBeTruthy();
        expect(hasBackButton).toBeTruthy();
        expect(hasNextButton).toBeTruthy();
        expect(stepTwoInput.textContent).toBe("Email address *");
        expect(backButton.textContent).toBe("Back");
        expect(nextButton.textContent).toBe("Next");
    });
    it("Step #1 content should be displayed when step #2 back button is clicked", () => {
        const stepTwoButton: HTMLButtonElement = registerHtml.querySelector("#stepTwoPreviousButton");
        stepTwoButton.click();
        const stepOneContent: Element = registerHtml.querySelectorAll(".mat-vertical-content")[0];
        expect(stepOneContent).toBeTruthy();
    });
    it("Step #3 content should be displayed when step #2 next button is clicked", () => {
        const stepTwoButton: HTMLButtonElement = registerHtml.querySelector("#stepTwoNextButton");
        stepTwoButton.click();
        const stepThreeContent: Element = registerHtml.querySelectorAll(".mat-vertical-content")[2];
        expect(stepThreeContent).toBeTruthy();
    });
    it('Step #3 should have a title with the text "Arrival hour"', () => {
        const stepThreeHeaderText: string = registerHtml.querySelectorAll(".mat-step-text-label")[2].innerHTML;
        expect(stepThreeHeaderText).toBe("Arrival hour");
    });
    it('Step #3 content should display an input with a placeholder text of "Arrival hour *" and two buttons to move between steps that have the text "back" and "next"', () => {
        const stepThreeContent: Element = registerHtml.querySelectorAll(".mat-vertical-content")[2];
        const stepThreeInput : HTMLInputElement = stepThreeContent.querySelector("mat-form-field");
        const backButton: HTMLButtonElement = registerHtml.querySelector(
            "#stepThreePreviousButton"
          );
          const nextButton: HTMLButtonElement = registerHtml.querySelector(
            "#stepThreeNextButton"
          );
        const hasInput: boolean = stepThreeContent.contains(stepThreeInput);
        const hasBackButton: boolean = stepThreeContent.contains(backButton);
        const hasNextButton: boolean = stepThreeContent.contains(nextButton);
        expect(hasInput).toBeTruthy();
        expect(hasBackButton).toBeTruthy();
        expect(hasNextButton).toBeTruthy();
        expect(stepThreeInput.textContent).toBe("Arrival hour *");
        expect(backButton.textContent).toBe("Back");
        expect(nextButton.textContent).toBe("Next");
    });
    it("Step #2 content should be displayed when step #3 back button is clicked", () => {
        const stepThreeButton: HTMLButtonElement = registerHtml.querySelector("#stepThreePreviousButton");
        stepThreeButton.click();
        const stepTwoContent: Element = registerHtml.querySelectorAll(".mat-vertical-content")[1];
        expect(stepTwoContent).toBeTruthy();
    });
    it("Step #4 content should be displayed when step #3 next button is clicked", () => {
        const stepThreeButton: HTMLButtonElement = registerHtml.querySelector("#stepThreeNextButton");
        stepThreeButton.click();
        const stepFourContent: Element = registerHtml.querySelectorAll(".mat-vertical-content")[3];
        expect(stepFourContent).toBeTruthy();
    });
    it('Step #4 should have a title with the text "Profile Photo (Optional)"', () => {
        const stepFourHeaderText: string = registerHtml.querySelectorAll(".mat-step-text-label")[3].innerHTML;
        expect(stepFourHeaderText).toBe("Profile Photo (Optional)");
    });
    it('Step #4 content should display an input with a placeholder text of "Photo URL" and two buttons to move between steps that have the text "back" and "next"', () => {
        const stepFourContent: Element = registerHtml.querySelectorAll(".mat-vertical-content")[3];
        const stepFourInput : HTMLInputElement = stepFourContent.querySelector("mat-form-field");
        const backButton: HTMLButtonElement = registerHtml.querySelector(
            "#stepFourPreviousButton"
          );
          const nextButton: HTMLButtonElement = registerHtml.querySelector(
            "#stepFourNextButton"
          );
        const hasInput: boolean = stepFourContent.contains(stepFourInput);
        const hasBackButton: boolean = stepFourContent.contains(backButton);
        const hasNextButton: boolean = stepFourContent.contains(nextButton);
        expect(hasInput).toBeTruthy();
        expect(hasBackButton).toBeTruthy();
        expect(hasNextButton).toBeTruthy();
        expect(stepFourInput.textContent).toBe("Photo URL");
        expect(backButton.textContent).toBe("Back");
        expect(nextButton.textContent).toBe("Next");
    });
    it("Step #3 content should be displayed when step #4 back button is clicked", () => {
        const stepFourButton: HTMLButtonElement = registerHtml.querySelector("#stepFourPreviousButton");
        stepFourButton.click();
        const stepThreeContent: Element = registerHtml.querySelectorAll(".mat-vertical-content")[2];
        expect(stepThreeContent).toBeTruthy();
    });
    it("Step #5 content should be displayed when step #4 next button is clicked", () => {
        const stepFourButton: HTMLButtonElement = registerHtml.querySelector("#stepFourNextButton");
        stepFourButton.click();
        const stepFiveContent: Element = registerHtml.querySelectorAll(".mat-vertical-content")[4];
        expect(stepFiveContent).toBeTruthy();
    });
    it('Step #5 should have a title with the text "Generate PIN"', () => {
        const stepFiveHeaderText: string = registerHtml.querySelectorAll(".mat-step-text-label")[4].innerHTML;
        expect(stepFiveHeaderText).toBe("Generate PIN");
    });
    it('Step #5 content should display a button with the text "Finish"', () => {
        const stepFiveContent: Element = registerHtml.querySelectorAll(".mat-vertical-content")[4];
        const finishButton: HTMLButtonElement = registerHtml.querySelector("#submit");
        const finishButtonSpan = finishButton.children[0];
        const buttonText: string = finishButtonSpan.innerHTML;
        const hasFinishButton: boolean = stepFiveContent.contains(
            finishButton
          );
        expect(hasFinishButton).toBeTruthy();
        expect(buttonText).toBe("Finish");  
    });
    it("Step #5 should submit the form when the user clicks the Finish button when data is valid", () => {
        const mockData = {
            status: "succesful",
            data: [],
            message: null
        };
        const mockResponse = { status: 201, statusText: "Created" };
        const submitMethod = spyOn(registerComponent, "SubmitData").and.callThrough();
        alertService = TestBed.get(AlertsService);
        const displayAlertMethod = spyOn(
            alertService,
            "alertMessage"
        ).and.callThrough();
        const name = registerComponent.profileForm.controls.fullName;
        name.setValue("Name Lastname");
        const email = registerComponent.profileForm.controls.email;
        email.setValue("example@email.com");
        const time = registerComponent.profileForm.controls.arrival;
        time.setValue("08:00");
        registerComponent.SubmitData();
        const request =  httpMock.expectOne(`${environment.apiUrl}users/create`);
        request.flush(mockData, mockResponse);
        httpMock.verify();
        expect(submitMethod).toHaveBeenCalled();
        expect(displayAlertMethod).toHaveBeenCalled();
    });
    it("Step #5 should not create a user if the full name is empty when the user clicks the submit button", () => {
        const email = registerComponent.profileForm.controls.email;
        email.setValue("example@email.com");
        const time = registerComponent.profileForm.controls.arrival;
        time.setValue("08:00");
        const form = registerComponent.profileForm.valid;
        expect(form).toBeFalsy();
        const submitMethod = spyOn(registerComponent, "SubmitData").and.callThrough();
        registerComponent.SubmitData();
        expect(submitMethod).toHaveBeenCalled();
        httpMock.expectNone(`${environment.apiUrl}users/create)`);
    });
    it("Step #5 should not create a user if the email is empty when the user clicks the submit button", () => {
        const name = registerComponent.profileForm.controls.fullName;
        name.setValue("Name Lastname");
        const time = registerComponent.profileForm.controls.arrival;
        time.setValue("08:00");
        const form = registerComponent.profileForm.valid;
        expect(form).toBeFalsy();
        const submitMethod = spyOn(registerComponent, "SubmitData").and.callThrough();
        registerComponent.SubmitData();
        expect(submitMethod).toHaveBeenCalled();
        httpMock.expectNone(`${environment.apiUrl}users/create)`);
    });
    it("Step #5 should not create a user if the arrival time is empty when the user clicks the submit button", () => {
        const name = registerComponent.profileForm.controls.fullName;
        name.setValue("Name Lastname");
        const email = registerComponent.profileForm.controls.email;
        email.setValue("example@email.com");
        const form = registerComponent.profileForm.valid;
        expect(form).toBeFalsy();
        const submitMethod = spyOn(registerComponent, "SubmitData").and.callThrough();
        registerComponent.SubmitData();
        expect(submitMethod).toHaveBeenCalled();
        httpMock.expectNone(`${environment.apiUrl}users/create)`);
    });
});