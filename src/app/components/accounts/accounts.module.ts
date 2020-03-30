import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsComponent } from './accounts.component';
import { AccountsRoutingModule } from './accounts-routing.module';
import { EmptyStringPipe } from 'src/app/pipes/empty-string.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BankAccountModalComponent } from 'src/app/modals/bank-account-modal/bank-account-modal.component';




@NgModule({
  declarations: [
    AccountsComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  entryComponents: [BankAccountModalComponent]
})
export class AccountsModule { }
