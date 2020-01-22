import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreatePTOComponent } from './components/CreatePTO/CreatePTO.component';
import { RegisterComponent } from './components/register/register.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { FooterComponent } from './components/footer/footer.component';
import { CheckInComponent } from './components/check-in/check-in.component';

// Angular material modules
import { MatSliderModule } from '@angular/material/slider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { MatToolbarModule, MatSidenavModule, MatListModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,
    CreatePTOComponent,
    NavbarComponent,
    RegisterComponent,
    RankingComponent,
    FooterComponent,
    CheckInComponent
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
    MatGridListModule,
    MatCardModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
    MatSnackBarModule
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
