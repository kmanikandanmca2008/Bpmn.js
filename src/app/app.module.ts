import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AtomModelerComponent, WizardDialogComponent, XmlDialogComponent } from './atom-modeler/atom-modeler.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonToggleModule, MatButtonModule, MatDialogModule, MatStepperModule, MatFormFieldModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    AtomModelerComponent,
    WizardDialogComponent,
    XmlDialogComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatDialogModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [WizardDialogComponent, XmlDialogComponent]
})
export class AppModule { }
