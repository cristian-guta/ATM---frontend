import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AccountService } from 'src/app/services/account.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  loading = true;
  accounts: Account[] = [];

  constructor(
    private _auth: AuthenticationService,
    private _accountService: AccountService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._router.events.subscribe(event => {
        if (event instanceof NavigationEnd && event.url === '/accounts') {
            this.getAccounts();
        }
    });
    this.getAccounts();
  }

  getAccounts(){
    const url = this._router.url;
    this._accountService.getAccountByCNP()
                .subscribe((result: Account[]) => {
                    this.accounts = result;
                    this.loading = false;
                });
  }

  isAdmin() {
    return this._auth.getRole().includes('ADMIN');
  }

  removeProduct(account) {
    this.accounts = this.accounts.filter((acc: Account) => acc.id !== account.id);
}

}
