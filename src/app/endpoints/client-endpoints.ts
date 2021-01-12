import { Client } from '../models/client';

export class ClientEndpoints{
    allClients = 'api/clients';
    currentClient = 'api/clients/current';
    updateClient = 'api/clients/update';
    deactivateClient = 'api/clients/delete';
    activateClient = 'api/clients/activate';

    getAllClients(page, size){
        return this.allClients + '/' + page + '/' + size;
    }
    
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

