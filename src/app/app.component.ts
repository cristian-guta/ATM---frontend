import { AccountInformationComponent } from './modals/account-information/account-information.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastService } from './services/toast.service';
import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'ATM - Project';
    currentUser: any;
    loginOrRegister = false;


    constructor(
        private _auth: AuthenticationService,
        private _toast: ToastService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _title: Title,
        private _modal: BsModalService
    ) {
        this._auth.currentUser.subscribe(user => this.currentUser = user);

        this._router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(() => {
                let child = this._route.firstChild;
                while (child.firstChild) {
                    child = child.firstChild;
                }
                if (child.snapshot.data.title) {
                    return child.snapshot.data.title + ' - ' + this.title;
                }
                return this.title;
            })
        ).subscribe((title: string) => {
            if (title.indexOf('Login') > -1 || title.indexOf('Register') > -1) {
                this.loginOrRegister = true;
            } else {
                this.loginOrRegister = false;
            }
            this._title.setTitle(title);
        });
    }

    isAdmin() {
        return this._auth.getRole().includes('ADMIN');
    }

    openAccountInfoModal() {
        this._modal.show(AccountInformationComponent, { initialState: { isModal: true } });
    }

    logout() {
        this._auth.logout();
    }

}
