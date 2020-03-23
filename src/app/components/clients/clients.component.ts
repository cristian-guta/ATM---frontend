import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[] = [];
    constructor(
        private clientService: ClientService,
        private _toast: ToastService
    ) { }

    ngOnInit() {
        this.clientService.getClients()
            .subscribe((result: Client[]) => this.clients = result);
    }

    deactivate(client: Client) {
      client.deleting = true;
      this.clientService.deactivateClient(client)
          .subscribe(() => {
              client.deleting = false;
              client.deactivate = true;
              this._toast.showSuccess('Client successfully blocked!');
          });
  }

  activate(client: Client) {
      client.deleting = true;
      this.clientService.activateClient(client)
          .subscribe(() => {
              client.deleting = false;
              client.deactivate = false;
              this._toast.showSuccess('User successfully unblocked!');
          });
  }

}
