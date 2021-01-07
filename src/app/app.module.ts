import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
// import { LoginComponent } from './components/login/login.component';
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
import { UpdateUserInfoComponent } from './components/update-user-info/update-user-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // LoginComponent,
    MainComponent,
    SearchFieldsComponent,
    CardComponent,
    DescriptionDialogComponent,
    LandingComponent,
    DailyImgDialogComponent,
    SearchHistoryDialogComponent,
    UserLoggedSnackbarComponent,
    RegisterComponent,
    UpdateUserInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    NgxAuthFirebaseUIModule.forRoot(environment.firebase,
      () => 'Nasa Task', {
      enableFirestoreSync: true, // enable/disable autosync users with firestore
      toastMessageOnAuthSuccess: false, // whether to open/show a snackbar message on auth success - default : true
      toastMessageOnAuthError: false, // whether to open/show a snackbar message on auth error - default : true
      authGuardFallbackURL: '/loggedout', // url for unauthenticated users - to use in combination with canActivate feature on a route
      authGuardLoggedInURL: '/loggedin', // url for authenticated users - to use in combination with canActivate feature on a route
      passwordMaxLength: 60, // `min/max` input parameters in components should be within this range.
      passwordMinLength: 8, // Password length min/max in forms independently of each componenet min/max.
      // Same as password but for the name
      nameMaxLength: 50,
      nameMinLength: 2,
      // If set, sign-in/up form is not available until email has been verified.
      // Plus protected routes are still protected even though user is connected.
      guardProtectedRoutesUntilEmailIsVerified: true,
      enableEmailVerification: true, // default: true
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
