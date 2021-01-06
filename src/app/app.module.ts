import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchFieldsComponent } from './components/search-fields/search-fields.component';
import { DescriptionDialogComponent } from './components/description-dialog/description-dialog.component';
import { CardComponent } from './components/card/card.component';
import { MaterialModule } from './modules/material/material.module';
import { LandingComponent } from './components/landing/landing.component';
import { DailyImgDialogComponent } from './components/daily-img-dialog/daily-img-dialog.component';
import { SearchHistoryDialogComponent } from './components/search-history-dialog/search-history-dialog.component';
import { UserLoggedSnackbarComponent } from './components/user-logged-snackbar/user-logged-snackbar.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RegisterComponent } from './components/register/register.component';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    MainComponent,
    SearchFieldsComponent,
    CardComponent,
    DescriptionDialogComponent,
    LandingComponent,
    DailyImgDialogComponent,
    SearchHistoryDialogComponent,
    UserLoggedSnackbarComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    NgxAuthFirebaseUIModule.forRoot(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
