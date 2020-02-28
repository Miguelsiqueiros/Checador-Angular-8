import { RankingComponent } from './ranking.component';
import { TestBed, ComponentFixture } from "@angular/core/testing";
import { LoggerModule, NgxLoggerLevel } from "ngx-logger";
import {
    MatTableModule,
    MatSlideToggleModule, MatSlideToggle,
    MatIconModule,
  } from "@angular/material";
import {CheckInService } from "src/app/Services/checkIn.service";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
    HttpClientTestingModule
  } from "@angular/common/http/testing";
import { By } from '@angular/platform-browser';

describe("Test Ranking Component", () => {
    let fixture: ComponentFixture<RankingComponent>;
    let rankingComponent: RankingComponent;
    let rankingHtml: HTMLElement;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [RankingComponent],
            imports: [
                BrowserAnimationsModule,
                MatTableModule,
                MatIconModule,
                MatSlideToggleModule,
                HttpClientModule,
                HttpClientTestingModule,
                LoggerModule.forRoot({
                    serverLoggingUrl: "/api/logs",
                    level: NgxLoggerLevel.DEBUG,
                    serverLogLevel: NgxLoggerLevel.ERROR
                })  
            ],
            providers: [CheckInService]
        }).compileComponents();
        fixture = TestBed.createComponent(RankingComponent);
        rankingComponent = fixture.debugElement.componentInstance;
        rankingHtml = fixture.debugElement.nativeElement;
        fixture.detectChanges();
    });
    it("Should display Ranking component", () => {
        expect(rankingComponent).toBeTruthy();
    });
    it('Should display a table header with the title "Daily Ranking" and a slider', () => {
        const titleTable: HTMLTableElement = rankingHtml.querySelector("#titleTable");
        const title = titleTable.querySelector("#title").innerHTML;
        const slider: Element = titleTable.querySelector("#slider");
        const hasSlider: boolean = titleTable.contains(slider);
        expect(titleTable).toBeTruthy();
        expect(title).toBe("Daily Ranking");
        expect(hasSlider).toBeTruthy();
    });
    it('Should display a table with 3 columns with the titles "No.", "Name" and the alarm icon', () => {
        const infoTable: HTMLTableElement = rankingHtml.querySelector("#infoTable");
        const number = infoTable.querySelector(".numberColumn").innerHTML.trim();
        const name = infoTable.querySelector(".nameColumn").innerHTML.trim();
        const alarm: Element = infoTable.querySelector(".minutesColumn");
        expect(infoTable).toBeTruthy();
        expect(number).toBe("No.");
        expect(name).toBe("Name");
        expect(alarm.textContent).toBe("alarm");
    });
    it('Should trigger toggleRanking when the slider is clicked', () => {
        const componentDebug = fixture.debugElement;
        const slider = componentDebug.query(By.directive(MatSlideToggle));
        const toggleMethod = spyOn(rankingComponent, "toggleRanking").and.callThrough();
        slider.triggerEventHandler('click', null);
        expect(toggleMethod).toHaveBeenCalled();
    });
});