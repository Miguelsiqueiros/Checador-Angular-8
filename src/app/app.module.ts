import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { CreatePTOComponent } from './components/CreatePTO/CreatePTO.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'

import { MatTableModule } from '@angular/material/table'

import { RegisterComponent } from './components/register/register.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { FooterComponent } from './components/footer/footer.component';
import {MatTabsModule} from '@angular/material/tabs';
import { CheckInComponent } from './components/checkIn/checkIn.component';
import {MatGridListModule} from '@angular/material/grid-list';


@NgModule({
  declarations: [
    AppComponent,
    CreatePTOComponent,
    NavbarComponent,
    RegisterComponent,
    RankingComponent,
    FooterComponent
    ],
  imports: [
    MatTableModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatRadioModule,
    MatStepperModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    MatGridListModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AppModule { }
