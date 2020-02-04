import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { CheckInComponent } from './check-in.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CheckInService } from 'src/app/Services/checkIn.service';
import { RankingComponent } from '../ranking/ranking.component';
import { AlertsService } from 'src/app/Services/alerts.service';
import { NGXLogger } from 'ngx-logger';

@Injectable()
class MockCheckInService {}

@Injectable()
class MockRankingComponent {}

@Injectable()
class MockAlertsService {}

@Directive({ selector: '[oneviewPermitted]' })
class OneviewPermittedDirective {
  @Input() oneviewPermitted;
}

@Pipe({name: 'translate'})
class TranslatePipe implements PipeTransform {
  transform(value) { return value; }
}

@Pipe({name: 'phoneNumber'})
class PhoneNumberPipe implements PipeTransform {
  transform(value) { return value; }
}

@Pipe({name: 'safeHtml'})
class SafeHtmlPipe implements PipeTransform {
  transform(value) { return value; }
}

describe('CheckInComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        CheckInComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        OneviewPermittedDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        MatSnackBar,
        { provide: CheckInService, useClass: MockCheckInService },
        { provide: RankingComponent, useClass: MockRankingComponent },
        { provide: AlertsService, useClass: MockAlertsService },
        NGXLogger
      ]
    }).overrideComponent(CheckInComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(CheckInComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {

    component.ngOnInit();

  });

  it('should run #SubmitData()', async () => {
    component.checkInObject = component.checkInObject || {};
    component.checkInObject.checkIn = jest.fn().mockReturnValue(observableOf({}));
    component.alerts = component.alerts || {};
    component.alerts.alertMessage = jest.fn();
    component.RanTable = component.RanTable || {};
    component.RanTable.Refresh = jest.fn();
    component.logger = component.logger || {};
    component.logger.debug = jest.fn();
    component.SubmitData();
    // expect(component.checkInObject.checkIn).toHaveBeenCalled();
    // expect(component.alerts.alertMessage).toHaveBeenCalled();
    // expect(component.RanTable.Refresh).toHaveBeenCalled();
    // expect(component.logger.debug).toHaveBeenCalled();
  });

});