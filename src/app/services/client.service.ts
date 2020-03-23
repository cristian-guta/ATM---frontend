import { RestService } from './rest.service';
import { Injectable } from '@angular/core';
import { ClientEndpoints } from '../endpoints/client-endpoints';
import { Client } from '../models/client';

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    private clientEnds = new ClientEndpoints();

    constructor(
        private rest: RestService
    ){}

    getClients(){
        return this.rest.get(this.clientEnds.allClients);
    }

    getCurrentClient(){
        return this.rest.get(this.clientEnds.currentClient);
    }

    updateClient(client: Client){
        return this.rest.put(this.clientEnds.getUpdateClient(client), client);
    }

    deactivateClient(client: Client){
        return this.rest.delete(this.clientEnds.getDeactivateClient(client));
    }

    activateClient(client: Client){
        return this.rest.put(this.clientEnds.getActivateClient(client), client);
    }
}

