import { Account } from '../models/account';

export class AccountEndpoints{
    accountByCNP = 'accounts';
    create = 'accounts/create';
    delete = 'accounts/delete';
    account = 'accounts';
    allAccounts = 'accounts/getAllAccounts';
    update = 'accounts/update';
    deposit = 'accounts/deposit';
    withdraw = 'accounts/withdraw';
    transfer = 'accounts/transfer';

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