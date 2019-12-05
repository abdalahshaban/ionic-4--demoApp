import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OffersPageRoutingModule } from './offers-routing.module';
import { OfferItemComponent } from './offer-item/offer-item.component';

import { OffersPage } from './offers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    OffersPageRoutingModule
  ],
  declarations: [OffersPage, OfferItemComponent]
})
export class OffersPageModule { }
