import { Component, OnInit } from '@angular/core';
import { Subscription } from 'src/app/models/subscription';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, NavigationEnd } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SubscriptionModalComponent } from 'src/app/modals/subscription-modal/subscription-modal.component';


@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css'],
  providers: [Subscription]
})
export class SubscriptionsComponent implements OnInit {

  // subscription = new Subscription();
  public subscription: Subscription;
  public subscriptions: Subscription[] = [];
  modalRef: BsModalRef;
  public isActivated: boolean;


  constructor(
    private _auth: AuthenticationService,
    private subsService: SubscriptionService,
    private _router: Router,
    private _modal: BsModalService,

    
  ) {}

  ngOnInit(){
    this.isActivated=false;
    this.getSubscriptions();
  }



  getSubscriptions(){

    this.subsService.getAllSubscriptions().subscribe((subs: Subscription[]) => {
      this.subscriptions = subs;
    });
        
    this.subsService.getSubscription().subscribe((sub: Subscription) => {
      this.subscription=sub;
      if(sub){
        this.isActivated=true;
      }
    });
    
  }

  openModal() {
    this.modalRef = this._modal.show(SubscriptionModalComponent);
    this.modalRef.content.onClose.subscribe((subscription: Subscription) => {
        this.subscriptions.push(subscription);
    });
}

  isAdmin() {
    return this._auth.getRole().includes('ADMIN');
  }

  isAnonymous(){
    return this._auth.getRole().includes('ANONYMOUS');
  }

  isUser(){
    return this._auth.getRole().includes('USER');
  }

  removeSubscription(subscription){
    this.subscriptions = this.subscriptions.filter((sub: Subscription) => sub.id!== subscription.id);
  }

}
