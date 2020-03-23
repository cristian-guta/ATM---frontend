import { NgModule } from "@angular/core";
import { BenefitsComponent } from './benefits.component';
import { CommonModule } from '@angular/common';
import { BenefitsRoutingModule } from './benefits-routing.module';

@NgModule({
    declarations: [
        BenefitsComponent,
    ],
    imports: [
        CommonModule,
        BenefitsRoutingModule
    ]
})
export class BenefitsModule{}