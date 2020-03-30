import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AccountService } from 'src/app/services/account.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BankAccountModalComponent } from 'src/app/modals/bank-account-modal/bank-account-modal.component';
import { ToastService } from 'src/app/services/toast.service';
import { AccountDepositModalComponent } from 'src/app/modals/account-deposit-modal/account-deposit-modal.component';
import { AccountWithdrawModalComponent } from 'src/app/modals/account-withdraw-modal/account-withdraw-modal.component';
import { Client } from 'src/app/models/client';
import { TransferMoneyModalComponent } from 'src/app/modals/transfer-money-modal/transfer-money-modal.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  loading = true;
  accounts: Account[] = [];
  allAccounts: Account[] = [];
  modalRef: BsModalRef;
  clients: Client[] = [];

  constructor(
    private _auth: AuthenticationService,
    private _accountService: AccountService,
    private _modal: BsModalService,
    private _toast: ToastService
  ) { }

  ngOnInit() {
    
    this.getAllAccounts();
    this.getAccounts();    
  }

  getAccounts(){
    this._accountService.getAccountByCNP()
                .subscribe((result: Account[]) => {
                    this.accounts = result;
                    this.loading = false;
                });
  }

  getAllAccounts(){
    this._accountService.getAllAccounts().subscribe((accounts: Account[]) => {
      this.allAccounts = accounts;
      accounts.forEach(element => {
        this.clients.push(element.client);
      });
    });
    
  }

  isAdmin() {
    return this._auth.getRole().includes('ADMIN');
  }

  removeAccount(account) {
    this.accounts = this.accounts.filter((acc: Account) => acc.id !== account.id);
  }

  openModal() {
    this.modalRef = this._modal.show(BankAccountModalComponent);
    this.modalRef.content.onClose.subscribe((account: Account) => {
        this.accounts.push(account);
    });
  }

  delete(account: Account) {
    this._accountService.deleteAccount(account).subscribe(() => {
      this._toast.showSuccess('Account successfully deleted!');
    });
    window.location.reload();
  }

  deposit(account: Account){
    this._accountService.currAcct = account;
    this.modalRef = this._modal.show(AccountDepositModalComponent);
  }

  withdraw(account: Account){
    this._accountService.currAcct = account;
    this.modalRef = this._modal.show(AccountWithdrawModalComponent);
  }

  transfer(account: Account){
    this._accountService.currAcct = account;
    this.modalRef = this._modal.show(TransferMoneyModalComponent);
  }


}
