import { Injectable } from '@angular/core';
import { BenefitEndpoints } from '../endpoints/benefit-endpoints';
import { RestService } from './rest.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BenefitService{

    private benefitEnds = new BenefitEndpoints();

    constructor(private rest: RestService){}

    // getBenefitsBySub(id: number): Observable<any>{
    //     return this.rest.get(this.benefitEnds.getBenefitsBySubscription(id));
    // }

    getAllBenefits(){
        return this.rest.get(this.benefitEnds.allBenefits);
    }
}