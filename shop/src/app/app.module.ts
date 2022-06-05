import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './Components/header/header.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpService} from './services/http.service';
import {UserService} from './services/user.service';
import {Authenticate} from './services/authenticate.service';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDialogModule} from '@angular/material/dialog';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HeaderTop} from './Components/header-top/header-top.component';
import {AvatarComponent} from './Components/avatar/avatar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {FooterComponent} from './Components/footer/footer.component';
import {LogoComponent} from './Components/logo/logo.component';
import {AuthenticateHelper} from './Classes/authenticate-helper.service';
import {AdminNavComponent} from './Components/admin-nav/admin-nav.component';
import {SectionLayoutModule} from './Layouts/section-layout/section-layout.module';
import {SharedModule} from './shared/shared.module';
import {userReducer} from './store/store.reducer';
import {StoreModule} from '@ngrx/store';
import {SearchFormComponent} from './Components/search-form/search-form.component';
import {SideBarModule} from './Components/side-bar/side-bar.module';
import {InputTextModule} from "primeng/inputtext";

const modules = [
  MatIconModule,
  MatBadgeModule,
  MatDialogModule,
  NgbModule,
  MatSidenavModule,
  AppRoutingModule,
];

@NgModule({
  declarations: [
    AppComponent, HeaderComponent, SearchFormComponent,
    HeaderTop, AvatarComponent, FooterComponent, LogoComponent, AdminNavComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        SharedModule,
        SectionLayoutModule,
        ...modules,
        StoreModule.forRoot({auth: userReducer}),
        SideBarModule,
        InputTextModule,
    ],
  providers: [
    HttpService,
    UserService,
    AuthenticateHelper,
    {provide: HTTP_INTERCEPTORS, useClass: Authenticate, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
