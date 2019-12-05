import { PlacesService } from './../places.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from '../place.model';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
  sub: Subscription = new Subscription()
  offers: Place[];

  constructor(private placesService: PlacesService, private router: Router) { }

  ngOnInit() {
    this.sub.add(this.placesService.Places.subscribe(places => {
      this.offers = places
    }))
  }

  ionViewWillEnter() {

  }

  onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', offerId])
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
