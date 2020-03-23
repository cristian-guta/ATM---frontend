import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RestService {
    private readonly serverLink = environment.serverLink;
    options = {
        headers: new HttpHeaders({
        })
    };

    constructor(
        private _http: HttpClient
    ) { }

    get(endpoint, options = this.options) {
        return this._http.get<any>(this.serverLink + endpoint, options);
    }

    post(endpoint, item, options = this.options) {
        return this._http.post<any>(this.serverLink + endpoint, item, options);
    }

    put(endpoint, item, options = this.options) {
        return this._http.put<any>(this.serverLink + endpoint, item, options);
    }

    delete(endpoint, options = this.options) {
        return this._http.delete<any>(this.serverLink + endpoint, options);
    }
}