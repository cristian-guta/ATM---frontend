import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    validLogin = true;
    loading = false;
    loginForm: AbstractControl;

    constructor(
        private _authService: AuthenticationService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _fb: FormBuilder
    ) { }

    ngOnInit() {
        this.loginForm = this._fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            rememberMe: false
        });
    }

    get username(): AbstractControl {
        return this.loginForm.get('username');
    }

    get password(): AbstractControl {
        return this.loginForm.get('password');
    }

    get rememberMe(): AbstractControl {
        return this.loginForm.get('rememberMe');
    }

    isValid(field): boolean {
        const control = this.loginForm.get(field);
        return control.touched && control.valid;
    }

    isInvalid(field): boolean {
        const control = this.loginForm.get(field);
        return control.touched && control.invalid;
    }

    login() {
        this.loading = true;
        if (this.loginForm.valid) {
            this._authService.login(this.username.value, this.password.value, this.rememberMe.value)
                .subscribe(() => { },
                    () => {
                        this.validLogin = false;
                        this.loading = false;
                    });
        }
        
    }

}
