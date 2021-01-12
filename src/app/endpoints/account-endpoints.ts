import { Account } from '../models/account';

export class AccountEndpoints{
    accountByCNP = 'api/accounts';
    create = 'api/accounts/create';
    delete = 'api/accounts/delete';
    account = 'api/accounts';
    allAccounts = 'api/accounts/getAllAccounts';
    update = 'api/accounts/update';
    deposit = 'api/accounts/deposit';
    withdraw = 'api/accounts/withdraw';
    transfer = 'api/accounts/transfer';

    getAllAccounts(page, size){
        return this.allAccounts + '/' + page + '/' + size;
    }

    getDelete(id: number): string{
        return this.delete + '/' + id;
    }

    getAccount(id: number): string{
        return this.account + '/' + id;
    }

    getUpdate(account: Account): string{
        return this.account + '/' + account.id;
    }

    getDeposit(id: number, amount: number): string{
        return this.deposit + '/' + id + '/' + amount;
    }

    getWithdraw(id: number, amount: number): string{
        return this.withdraw + '/' + id + '/' + amount;
    }

    getTransfer(senderId: number, receiverId: number, amount: number): string{
        return this.transfer+ '/'+ senderId + '/' + receiverId + '/' + amount;
    }
}