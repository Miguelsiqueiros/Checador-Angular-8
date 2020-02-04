import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { RankingComponent } from './ranking.component';
import { CheckInService } from 'src/app/Services/checkIn.service';
import { NGXLogger } from 'ngx-logger';

@Injectable()
class MockCheckInService {}

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

describe('RankingComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        RankingComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        OneviewPermittedDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: CheckInService, useClass: MockCheckInService },
        NGXLogger
      ]
    }).overrideComponent(RankingComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(RankingComponent);
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
    component.records = component.records || {};
    component.records.weeklyDatasource = jest.fn().mockReturnValue(observableOf({}));
    component.records.dailyDatasource = jest.fn().mockReturnValue(observableOf({}));
    component.logger = component.logger || {};
    component.logger.debug = jest.fn();
    component.ngOnInit();
    // expect(component.records.weeklyDatasource).toHaveBeenCalled();
    // expect(component.records.dailyDatasource).toHaveBeenCalled();
    // expect(component.logger.debug).toHaveBeenCalled();
  });

  it('should toggle ranking table', async () => {
    component.ngOnInit = jest.fn();
    component.toggleRanking();
    // expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('should run #Refresh() the table', async () => {
    component.ngOnInit = jest.fn();
    component.Refresh();
    // expect(component.ngOnInit).toHaveBeenCalled();
  });

});