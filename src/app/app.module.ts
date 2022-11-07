import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { CommonModule, DatePipe } from '@angular/common';

import { AppComponent } from './app.component';


import {MatDialogModule} from '@angular/material/dialog'; // Material dialog : Popup
import { TestComponent } from './test/test.component';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from './header/header.component';
import { ProcessComponent } from './process/process.component';
import { TaskComponent } from './task/task.component';
import { FormlyComponent } from './formly/formly.component';

// Formly :
import { FormlyModule } from '@ngx-formly/core'; // npm i @ngx-formly/core@6.x
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap'; // npm i @ngx-formly/bootstrap



@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    FormComponent,
    HeaderComponent,
    ProcessComponent,
    TaskComponent,
    FormlyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    MatStepperModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatSliderModule,
    FormsModule,
    MatDialogModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule
  ] ,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
