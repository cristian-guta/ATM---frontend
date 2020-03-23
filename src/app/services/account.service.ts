import { Injectable } from '@angular/core';
import { AccountEndpoints } from '../endpoints/account-endpoints';
import { RestService } from './rest.service';
import { Account } from '../models/account';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AccountService{
    private accountEnds = new AccountEndpoints();
    constructor(
        private rest: RestService,
    ){}

    getAccountByCNP(): Observable<any>{
        return this.rest.get(this.accountEnds.accountsByCNP);
    }

    getAccount(account: Account): Observable<any>{
        return this.rest.get(this.accountEnds.getAccount(account.id));
    }

    createAccount(account: Account): Observable<any>{
        return this.rest.post(this.accountEnds.create, account);
    }

    deleteAccount(account: Account): Observable<any>{
        return this.rest.delete(this.accountEnds.getDelete(account.id));
    }
}