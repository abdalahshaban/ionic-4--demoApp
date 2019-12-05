import { PlacesService } from './../../places.service';
import { Place } from './../../place.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offer-booking',
  templateUrl: './offer-booking.page.html',
  styleUrls: ['./offer-booking.page.scss'],
})
export class OfferBookingPage implements OnInit, OnDestroy {
  sub: Subscription = new Subscription()
  place: Place
  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private placeServ: PlacesService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers')
        return;
      }

      this.sub.add(this.placeServ.getPlace(paramMap.get('placeId')).subscribe(place => {
        this.place = place
      }))


    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.sub.unsubscribe()
  }
}
