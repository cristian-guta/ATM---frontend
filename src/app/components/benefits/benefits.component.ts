import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BenefitService } from 'src/app/services/benefit.service';
import { Benefit } from 'src/app/models/benefit';
import { Subscription } from 'src/app/models/subscription';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.css']
})
export class BenefitsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  benefits: MatTableDataSource<Benefit>;
  subscription: Subscription;
  length: number;
  pageSize: number=5;
  pageIndex:number = 0;

  displayColumns: string[] = ['id', 'description'];

  constructor(
    private _auth: AuthenticationService,
    private benefitService: BenefitService,
    private subscriptionService: SubscriptionService,
    
  ) { }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.benefits.filter = filterValue;
  }

  ngOnInit() { 
    if(!this.isAdmin()){
      this.subscriptionService.getSubscription().subscribe((sub: Subscription) => {
        this.benefits = new MatTableDataSource<Benefit>(sub.benefits);
        // this.benefits.data = sub.benefits;
      })
    }
    else{
        this.getData(this.pageSize, this.pageIndex);
    }
  }

  getData(size, index){
    this.benefitService.getAllBenefits(index, size)
    .subscribe(result => {
      this.benefits = result.content;
      this.benefits.paginator = this.paginator;
      this.length = result.totalElements;
    });
  }

  handleRequest(event: any){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getData(this.pageSize, this.pageIndex);
  }

  isAdmin() {
    return this._auth.getRole().includes('ADMIN');
  } 

}
