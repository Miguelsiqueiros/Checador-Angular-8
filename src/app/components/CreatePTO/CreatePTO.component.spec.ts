import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { CreatePTOComponent } from './CreatePTO.component';
import { PtoService } from 'src/app/Services/pto.service';
import { AlertsService } from 'src/app/Services/alerts.service';
import { NGXLogger } from 'ngx-logger';

@Injectable()
class MockPtoService {}

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

describe('CreatePTOComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        CreatePTOComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        OneviewPermittedDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: PtoService, useClass: MockPtoService },
        { provide: AlertsService, useClass: MockAlertsService },
        NGXLogger
      ]
    }).overrideComponent(CreatePTOComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(CreatePTOComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit() of component', async () => {
    component.logObj = component.logObj || {};
    component.logObj.debug = jest.fn();
    component.ngOnInit();
    // expect(component.logObj.debug).toHaveBeenCalled();
  });

  it('should #Submit() data', async () => {
    component.model = component.model || {};
    component.model.pin = 'pin';
    component.model.day = 'day';
    component.ptoObject = component.ptoObject || {};
    component.ptoObject.newPto = jest.fn().mockReturnValue(observableOf({}));
    component.alerts = component.alerts || {};
    component.alerts.alertMessage = jest.fn();
    component.logObj = component.logObj || {};
    component.logObj.debug = jest.fn();
    component.Submit();
    // expect(component.ptoObject.newPto).toHaveBeenCalled();
    // expect(component.alerts.alertMessage).toHaveBeenCalled();
    // expect(component.logObj.debug).toHaveBeenCalled();
  });

});