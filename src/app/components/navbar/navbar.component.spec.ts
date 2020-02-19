import { NavbarComponent } from "./navbar.component";
import { CreatePTOComponent } from "../CreatePTO/CreatePTO.component";
import { RegisterComponent } from "../register/register.component";
import { CheckInComponent } from "../check-in/check-in.component";
import { AppRoutingModule } from "../../app-routing.module";
import { RankingComponent } from "../ranking/ranking.component";
import {
  TestBed,
  ComponentFixture,
  getTestBed,
  fakeAsync,
  tick
} from "@angular/core/testing";
import { LoggerModule, NgxLoggerLevel } from "ngx-logger";
import {
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatStepperModule,
  MatListModule,
  MatSlideToggleModule,
  MatSidenavModule,
  MatToolbarModule,
  MatRadioModule,
  MatTableModule,
  MatSnackBarModule
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { By } from "protractor";

fdescribe("Test NavBar component", () => {
  let fixture: ComponentFixture<NavbarComponent>;
  let navBarComponent: NavbarComponent;
  let navBarHtml: HTMLElement;
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegisterComponent,
        NavbarComponent,
        CheckInComponent,
        CreatePTOComponent,
        RankingComponent
      ],
      imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatStepperModule,
        MatListModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatSidenavModule,
        MatToolbarModule,
        MatRadioModule,
        MatTableModule,
        MatSnackBarModule,
        HttpClientModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        LoggerModule.forRoot({
          serverLoggingUrl: "/api/logs",
          level: NgxLoggerLevel.DEBUG,
          serverLogLevel: NgxLoggerLevel.ERROR
        })
      ],
      providers: [
        RegisterComponent,
        CheckInComponent,
        CreatePTOComponent,
        RankingComponent
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(NavbarComponent);
    navBarComponent = fixture.debugElement.componentInstance;
    navBarHtml = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture.ngZone.run(() => {
      router.initialNavigation();
    });
  });
  it("Should display Navbar component", () => {
    expect(navBarComponent).toBeTruthy();
  });
  it("Should have four menu buttons", () => {
    const numberOfMenuItems: number = navBarHtml.querySelectorAll(".mat-button")
      .length;
    expect(numberOfMenuItems).toBe(4);
  });
  it("Button #1 should display a menu icon", () => {
    const menuButton1: string = navBarHtml
      .querySelectorAll(".mat-button")[0]
      .querySelector(".mat-button-wrapper")
      .querySelector(".mat-icon").innerHTML;
    expect(menuButton1).toBe("menu");
  });
  it("Button #2 should display a check-in icon", () => {
    const menuButton2: string = navBarHtml
      .querySelectorAll(".mat-button")[1]
      .querySelector(".mat-button-wrapper")
      .querySelector(".mat-icon").innerHTML;
    expect(menuButton2).toBe("check_circle");
  });
  it("Button #3 should display a report-problem icon", () => {
    const menuButton3: string = navBarHtml
      .querySelectorAll(".mat-button")[2]
      .querySelector(".mat-button-wrapper")
      .querySelector(".mat-icon").innerHTML;
    expect(menuButton3).toBe("report_problem");
  });
  it("Button #4 should display a dashboard icon", () => {
    const menuButton4: string = navBarHtml
      .querySelectorAll(".mat-button")[3]
      .querySelector(".mat-button-wrapper")
      .querySelector(".mat-icon").innerHTML;
    expect(menuButton4).toBe("dashboard");
  });
  it('Navigate to "check-in" takes you to /check-in', fakeAsync(() => {
    fixture.ngZone.run(() => {
      router.navigate(["check-in"]);
      tick();
      expect(location.path()).toBe("/check-in");
    });
  }));
  it('Navigate to "register" takes you to /register', fakeAsync(() => {
    fixture.ngZone.run(() => {
      router.navigate(["register"]);
      tick();
      expect(location.path()).toBe("/register");
    });
  }));
  it('Navigate to "PTO" takes you to /PTO', fakeAsync(() => {
    fixture.ngZone.run(() => {
      router.navigate(["PTO"]);
      tick();
      expect(location.path()).toBe("/PTO");
    });
  }));
});
