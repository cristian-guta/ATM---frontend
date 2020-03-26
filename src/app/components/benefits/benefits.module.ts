import { NgModule } from "@angular/core";
import { BenefitsComponent } from './benefits.component';
import { CommonModule } from '@angular/common';
import { BenefitsRoutingModule } from './benefits-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        BenefitsComponent,
    ],
    imports: [
        CommonModule,
        BenefitsRoutingModule,
        FormsModule,
    ]
})
export class BenefitsModule{}