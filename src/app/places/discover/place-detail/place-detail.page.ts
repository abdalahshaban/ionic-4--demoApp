import { AuthService } from './../../../auth/auth.service';
import { BookingService } from './../../../bookings/booking.service';
import { PlacesService } from './../../places.service';
import { Place } from './../../place.model';
import { CreateBookingComponent } from './../../../bookings/create-booking/create-booking.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, ModalController, ActionSheetController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  sub: Subscription = new Subscription()
  place: Place;
  isBookable = false
  constructor(private router: Router,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private placeServ: PlacesService,
    private modalCtr: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private bookingServ: BookingService,
    private loadingCtrl: LoadingController,
    private authServ: AuthService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paraMap => {
      if (!paraMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover')
        return;
      }
      this.sub.add(this.placeServ.getPlace(paraMap.get('placeId')).subscribe(place => {
        this.place = place;
        this.isBookable = place.userId !== this.authServ.userId
      }))


    })
  }

  onBookPlace() {
    //start of using action sheet
    this.actionSheetCtrl.create({
      header: 'Choose an action',
      mode: 'ios',
      backdropDismiss: true,
      buttons: [
        {
          text: 'Select Date',
          handler: () => {
            this.openBookingModal('select')
          }
        },
        {
          text: 'Random Date',
          handler: () => {
            this.openBookingModal('random')
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then(actionSheetEl => {
      actionSheetEl.present()
    })


    //end of using action sheet

  }

  openBookingModal(mode: 'select' | 'random') {
    console.log(mode);
    //start of  using Modal Controller 
    this.modalCtr.create({
      component: CreateBookingComponent,
      componentProps: { selectedPlace: this.place, selectedMode: mode },
      backdropDismiss: false,
    }).then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss()
    }).then((resultData) => {
      console.log(resultData.data, resultData.role);

      if (resultData.role === 'confirm') {
        this.loadingCtrl.create({
          message: 'Booking Place..',
          mode: 'ios',
          spinner: 'bubbles'
        }).then(loadingEl => {
          loadingEl.present()
          const { firstName, lastName, guestNumber, startDate, endDate } = resultData.data.bookingData
          console.log('Booked');
          this.bookingServ.addBooking(
            this.place.id,
            this.place.title,
            this.place.imageUrl,
            firstName,
            lastName,
            guestNumber,
            startDate,
            endDate

          ).subscribe(() => {
            loadingEl.dismiss()
            this.router.navigate(['/bookings'])
          })
        })

      }


    })
    //end of using modal controller
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
