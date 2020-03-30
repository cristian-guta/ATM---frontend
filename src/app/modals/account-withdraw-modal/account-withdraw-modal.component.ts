import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AccountService } from 'src/app/services/account.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastService } from 'src/app/services/toast.service';
import { Account } from 'src/app/models/account';

@Component({
  selector: 'app-account-withdraw-modal',
  templateUrl: './account-withdraw-modal.component.html',
  styleUrls: ['./account-withdraw-modal.component.css']
})
export class AccountWithdrawModalComponent implements OnInit {

  onClose: Subject<Account>;
  withdrawForm: FormGroup;
  saving = false;

  constructor(
    private _auth: AuthenticationService,
    private accountService: AccountService,
    private _bsModalRef: BsModalRef,
    private _fb: FormBuilder,
    private _toast: ToastService
  ) { }

  account = this.accountService.currAcct;

  ngOnInit(): void {
    this.onClose = new Subject();
    this.withdrawForm = this._fb.group({
      amount: ['', Validators.required],
    });
  }

  get amount(){
    return this.withdrawForm.get('amount');
  }

  isValid(field): boolean {
    const control = this.withdrawForm.get(field);
    return control.touched && control.valid;
  }

  isInvalid(field): boolean {
      const control = this.withdrawForm.get(field);
      return control.touched && control.invalid;
  }

  save(): void{
    this.saving=true;
    
    this.accountService.withdrawMoney(this.account.id, this.amount.value)
      .subscribe(() => {
        this.saving = false;
        this.onClose.next();
        this.hideModal();
        this._toast.showSuccess('Amount successfully withdrawed!');
        window.location.reload();
      },
        () => {
          this.saving = false;
          this._toast.showError('Failed to withdraw the amount!');
        });
  }

  hideModal(): void {
    this._bsModalRef.hide();
  }

}
