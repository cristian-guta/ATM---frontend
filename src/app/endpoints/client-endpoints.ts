import { Client } from '../models/client';

export class ClientEndpoints{
    allClients = 'clients';
    currentClient = 'clients/current';
    updateClient = 'clients/update';
    deactivateClient = 'clients/delete';
    activateClient = 'clients/activate';

    
    getUpdateClient(client: Client){
        return this.updateClient + '/' + client.id;
    }

    getDeactivateClient(client: Client){
        return this.deactivateClient + '/' + client.id;
    }

    getActivateClient(client: Client){
        return this.activateClient + '/' + client.id;
    }
}

