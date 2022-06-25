import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {InputTextModule} from 'primeng/inputtext';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './Components/header/header.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpService} from './services/http.service';
import {UserService} from './services/user.service';
import {AuthenticateHelperService} from './services/authenticate-helper.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HeaderTop} from './Components/header-top/header-top.component';
import {FooterComponent} from './Components/footer/footer.component';
import {LogoComponent} from './Components/logo/logo.component';
import {AuthHelperService} from './Classes/auth-helper.service';
import {AdminNavComponent} from './Components/admin-nav/admin-nav.component';
import {SectionLayoutModule} from './Layouts/section-layout/section-layout.module';
import {SharedModule} from './shared/shared.module';
import {SearchFormComponent} from './Components/search-form/search-form.component';
import {SideBarModule} from './Components/side-bar/side-bar.module';

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
    AppComponent,
    HeaderComponent, SearchFormComponent,
    HeaderTop, FooterComponent, LogoComponent, AdminNavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    SectionLayoutModule,
    ...modules,
    SideBarModule,
    InputTextModule,
  ],
  providers: [
    HttpService,
    UserService,
    AuthHelperService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthenticateHelperService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
