import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule, JwtInterceptor } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AccountInformationComponent } from './modals/account-information/account-information.component';
import { SubscriptionModalComponent } from './modals/subscription-modal/subscription-modal.component';
import { MatSelectModule } from '@angular/material/select';
import { BankAccountModalComponent } from './modals/bank-account-modal/bank-account-modal.component';
import { AccountDepositModalComponent } from './modals/account-deposit-modal/account-deposit-modal.component';
import { AccountWithdrawModalComponent } from './modals/account-withdraw-modal/account-withdraw-modal.component';
import { TransferMoneyModalComponent } from './modals/transfer-money-modal/transfer-money-modal.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

export function tokenGetter() {
  if (sessionStorage.getItem('jwt')) {
      return sessionStorage.getItem('jwt');
  } else {
      return localStorage.getItem('jwt');
  }
}

@NgModule({
  declarations: [
    AppComponent,   
    AccountInformationComponent, SubscriptionModalComponent, BankAccountModalComponent, AccountDepositModalComponent, AccountWithdrawModalComponent, TransferMoneyModalComponent,
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      HttpClientModule,
      JwtModule.forRoot({
          config: {
              tokenGetter: tokenGetter,
              whitelistedDomains: [environment.frontendDomain, environment.serverDomain, environment.serverLink],
          }
      }),
      ToastrModule.forRoot(),
      ModalModule.forRoot(),
      ReactiveFormsModule,
      UiSwitchModule,
      MatSelectModule,
      MatPaginatorModule,
      MatSortModule,
      MatTableModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
  }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AccountInformationComponent,
    SubscriptionModalComponent 
],
exports: [
  MatButtonModule,
  MatButtonToggleModule,
]
})
export class AppModule { }
