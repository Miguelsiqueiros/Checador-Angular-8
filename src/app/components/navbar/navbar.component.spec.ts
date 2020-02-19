import { NavbarComponent } from "./navbar.component";
import { CreatePTOComponent } from "../CreatePTO/CreatePTO.component";
import { RegisterComponent } from "../register/register.component";
import { CheckInComponent } from "../check-in/check-in.component";
import { AppRoutingModule } from "../../app-routing.module";
import { RankingComponent } from "../ranking/ranking.component";
import {
  TestBed,
  ComponentFixture,
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
import { By } from "@angular/platform-browser";

describe("Test NavBar component", () => {
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
    const menuButton = navBarHtml
      .querySelector("#menu")
      .querySelector(".mat-icon").innerHTML;
    expect(menuButton).toBe("menu");
  });
  it("Button #2 should display a check-in icon", () => {
    const checkinButton = navBarHtml
      .querySelector("#checkin")
      .querySelector(".mat-icon").innerHTML;
    expect(checkinButton).toBe("check_circle");
  });
  it("Button #3 should display a report-problem icon", () => {
    const ptoButton = navBarHtml
      .querySelector("#pto")
      .querySelector(".mat-icon").innerHTML;
    expect(ptoButton).toBe("report_problem");
  });
  it("Button #4 should display a dashboard icon", () => {
    const dashboardButton = navBarHtml
      .querySelector("#dashboard")
      .querySelector(".mat-icon").innerHTML;
    expect(dashboardButton).toBe("dashboard");
  });
  it("Should display sidebar when menu button is clicked", () => {
    const menuButton = fixture.debugElement.query(By.css("a"));
    const sideBar = navBarHtml.querySelector("#sideBar");
    menuButton.triggerEventHandler("click", {});
    fixture.detectChanges();
    expect(sideBar.classList.contains("mat-drawer-opened")).toBe(true);
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
