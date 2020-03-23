import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BenefitService } from 'src/app/services/benefit.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Benefit } from 'src/app/models/benefit';

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.css']
})
export class BenefitsComponent implements OnInit {

  benefits: Benefit[] = [];

  constructor(
    private _auth: AuthenticationService,
    private benefitService: BenefitService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url === '/subscription') {
          this.getBenefits();
      }
  });
  this.getBenefits();
  }

  isAdmin() {
    return this._auth.getRole().includes('ADMIN');
  }

  getBenefits(){
    const url = this._router.url;
    if (url.indexOf('/subscription') > -1){
      let subscriptionId = this._route.snapshot.params.id;
      if (subscriptionId === undefined) {
        subscriptionId = url.split('/')[url.split('/').length - 1];
      }
      this.benefitService.getBenefitsBySub(subscriptionId)
          .subscribe((result: Benefit[]) => {
            this.benefits = result;
          });
    }
    else{
      this.benefitService.getAllBenefits()
          .subscribe((result: Benefit[]) => {
            this.benefits = result;
          });
    }
  }

}
