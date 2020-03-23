export class AccountEndpoints{
    accountsByCNP = 'accounts';
    create = 'accounts/create';
    delete = 'accounts/delete';
    account = 'accounts';

    getDelete(id: number): string{
        return this.delete + '/' + id;
    }

    getAccount(id: number): string{
        return this.account + '/' + id;
    }
}