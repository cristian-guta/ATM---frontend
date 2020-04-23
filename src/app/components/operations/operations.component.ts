import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OperationsService } from 'src/app/services/operations.service';
import { Operation } from 'src/app/models/operation';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public operations = new MatTableDataSource<Operation>();
  displayColumns: string[] = ['id', 'type', 'amount', 'date', 'client', 'account'];

  constructor(
    private _auth: AuthenticationService,
    private operationsService: OperationsService
  ) { }

  ngOnInit(): void {
    this.getAllOperations()
  }

  getAllOperations(){
    this.operationsService.getAllOperations().subscribe((ops: Operation[]) => {
      this.operations.data=ops;
    });
  }

  ngAfterViewInit() {
    this.operations.paginator = this.paginator;
    this.operations.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.operations.filter = filterValue;
  }

  isAdmin() {
    return this._auth.getRole().includes('ADMIN');
  }

}
