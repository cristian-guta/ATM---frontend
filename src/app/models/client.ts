import { Subscription } from './subscription';


export class Client {
    id?: number;
    password?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    confirmPassword?: string;
    email?: string;
    cnp?: string;
    address?: string;
    deactivate?: boolean;
    role?: string;
    subscription?: Subscription;
    subscriptionId?: number;
    deleting?: boolean;
    activationDate?: Date;
}
