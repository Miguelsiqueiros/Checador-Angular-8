import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { RegisterComponent } from './register.component';
import { CheckInService } from 'src/app/Services/checkIn.service';
import { AlertsService } from 'src/app/Services/alerts.service';
import { NGXLogger } from 'ngx-logger';

@Injectable()
class MockCheckInService {}

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

describe('RegisterComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        RegisterComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        OneviewPermittedDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: CheckInService, useClass: MockCheckInService },
        { provide: AlertsService, useClass: MockAlertsService },
        NGXLogger
      ]
    }).overrideComponent(RegisterComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(RegisterComponent);
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
    component.profileForm = component.profileForm || {};
    component.profileForm.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.model = component.model || {};
    component.model.name = 'name';
    component.model.image = 'image';
    component.registerObject = component.registerObject || {};
    component.registerObject.registerName = jest.fn().mockReturnValue(observableOf({}));
    component.alerts = component.alerts || {};
    component.alerts.alertMessage = jest.fn();
    component.logger = component.logger || {};
    component.logger.debug = jest.fn();
    component.SubmitData();
    // expect(component.profileForm.get).toHaveBeenCalled();
    // expect(component.registerObject.registerName).toHaveBeenCalled();
    // expect(component.alerts.alertMessage).toHaveBeenCalled();
    // expect(component.logger.debug).toHaveBeenCalled();
  });

});