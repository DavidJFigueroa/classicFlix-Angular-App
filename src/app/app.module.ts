import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";

import {UserRegistrationFormComponent} from "./user-registration-form/user-registration-form.component";
import {UserLoginFormComponent} from "./user-login-form/user-login-form.component";
import {MovieCardComponent} from "./movie-card/movie-card.component";
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import {ProfileViewComponent} from "./profile-view/profile-view.component";
import {RouterModule, Routes} from "@angular/router";
import {NavigationBarComponent} from "./navigation-bar/navigation-bar.component";
import {MovieInfoComponent} from "./movie-info/movie-info.component";

const appRoutes: Routes = [
  {path: "welcome", component: WelcomePageComponent},
  {path: "movies", component: MovieCardComponent},
  {path: "profile", component: ProfileViewComponent},
  {path: "", redirectTo: "welcome", pathMatch: "prefix"},
];

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    ProfileViewComponent,
    NavigationBarComponent,
    MovieInfoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
