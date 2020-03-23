import { NgModule } from '@angular/core';
import { ClientsComponent } from './clients.component';
import { CommonModule } from '@angular/common';
import { ClientsRoutingModule } from './clients-routing.module';
import { EmptyStringPipe } from 'src/app/pipes/empty-string.pipe';

@NgModule({
    declarations: [
        ClientsComponent,
        EmptyStringPipe
    ],
    imports: [
        CommonModule,
        ClientsRoutingModule
    ]
})
export class ClientsModule { }
