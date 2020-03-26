import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BenefitService } from 'src/app/services/benefit.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Benefit } from 'src/app/models/benefit';
import { Subscription } from 'src/app/models/subscription';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { SubscriptionsComponent } from '../subscriptions/subscriptions.component';


@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.css']
})
export class BenefitsComponent implements OnInit {

  benefits: Benefit[] = [];
  subscription: Subscription;

  constructor(
    private _auth: AuthenticationService,
    private benefitService: BenefitService,
    private subscriptionService: SubscriptionService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {   
    if(!this.isAdmin()){
      this.subscriptionService.getSubscription().subscribe((sub: Subscription) => {
        this.benefits = sub.benefits;
      })
    }
    else{
      this.benefitService.getAllBenefits()
          .subscribe((result: Benefit[]) => {
            this.benefits = result;
          });
    }
  }

  isAdmin() {
    return this._auth.getRole().includes('ADMIN');
  }

}
