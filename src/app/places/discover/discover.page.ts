import { AuthService } from './../../auth/auth.service';
import { Place } from './../place.model';
import { PlacesService } from './../places.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  sub: Subscription = new Subscription()
  loadedPlaces: Place[];
  listedLoadedPlaces: Place[];
  relevantPlaces: Place[]
  constructor(private placeServ: PlacesService, private menuCtr: MenuController,
    private authServ: AuthService
  ) { }

  ngOnInit() {
    // this.loadedPlaces = this.placeServ.getPlaces()
    this.sub.add(
      this.placeServ.Places.subscribe(places => {
        this.loadedPlaces = places;
        this.relevantPlaces = this.loadedPlaces
        this.listedLoadedPlaces = this.relevantPlaces.slice(1)
      })
    )

  }

  onOpenMenu() {
    this.menuCtr.toggle()
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail);
    if (event.detail.value === 'all') {
      this.relevantPlaces = this.loadedPlaces
      this.listedLoadedPlaces = this.relevantPlaces.slice(1)
    } else {
      this.relevantPlaces = this.loadedPlaces.filter(place => place.userId !== this.authServ.userId)
      this.listedLoadedPlaces = this.relevantPlaces.slice(1)
    }

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

}
