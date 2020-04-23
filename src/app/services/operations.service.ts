import { Injectable } from '@angular/core';
import { OperationsEndpoints } from '../endpoints/operations-endpoints';
import { RestService } from './rest.service';

@Injectable({
    providedIn: 'root'
})
export class OperationsService{
    private operationsEnds = new OperationsEndpoints();

    constructor(
        private rest: RestService
    ){}

    getAllOperations(){
        return this.rest.get(this.operationsEnds.allOperations);
    }
}