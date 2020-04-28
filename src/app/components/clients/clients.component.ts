import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { ToastService } from 'src/app/services/toast.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  clients = new MatTableDataSource<Client>();
  displayColumns: string[] = ['id', 'firstName', 'lastName', 'username', 'email', 'address', 'cnp', 'actions'];
  
  
    constructor(
        private clientService: ClientService,
        private _toast: ToastService
    ) { }

    ngOnInit() {
        this.clientService.getClients()
            .subscribe((result: Client[]) => this.clients.data = result);
    }

    ngAfterViewInit() {
      this.clients.paginator = this.paginator;
      this.clients.sort = this.sort;
    }
  
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.clients.filter = filterValue;
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
