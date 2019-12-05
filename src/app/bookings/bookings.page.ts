import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Booking } from './booking.model';
import { BookingService } from './booking.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
  sub: Subscription = new Subscription()
  loadedBookings: Booking[]
  constructor(private bookServ: BookingService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.sub.add(this.bookServ.bookings.subscribe(bookings => {
      this.loadedBookings = bookings
    }, err => {
      console.log(err);
    }))
  }

  onCancelBooking(bookingId: string, slidItem: IonItemSliding) {
    slidItem.close()
    this.loadingCtrl.create({
      message: 'Cancelling...'
    }).then(loadingEl => {
      loadingEl.present()
      this.bookServ.cancelBookings(bookingId).subscribe(() => {
        loadingEl.dismiss()
      })
    })

  }


  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
