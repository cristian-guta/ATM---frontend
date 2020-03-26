import { Component, OnInit } from '@angular/core';
import { Subscription } from 'src/app/models/subscription';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SubscriptionModalComponent } from 'src/app/modals/subscription-modal/subscription-modal.component';


@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css'],
  providers: [Subscription]
})
export class SubscriptionsComponent implements OnInit {

  subscription = new Subscription();
  subscriptions: Subscription[] = [];
  modalRef: BsModalRef;

  constructor(
    private _auth: AuthenticationService,
    private subsService: SubscriptionService,
    private _router: Router,
    private _modal: BsModalService,
    
  ) { }

  ngOnInit(): void {

    if(this.isAdmin() || this.isAnonymous()){
      this.subsService.getAllSubscriptions().subscribe(
        data => {this.subscriptions = data}
      )
    }
    else{
      this.subsService.getSubscription().subscribe(
        data => {this.subscription = data}
      )
    }
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

  removeSubscription(subscription){
    this.subscriptions = this.subscriptions.filter((sub: Subscription) => sub.id!== subscription.id);
  }

}
