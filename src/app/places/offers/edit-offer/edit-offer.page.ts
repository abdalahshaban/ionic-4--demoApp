import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, LoadingController } from '@ionic/angular';
import { PlacesService } from './../../places.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Place } from '../../place.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
  sub: Subscription = new Subscription()
  place: Place;
  editOfferForm: FormGroup
  constructor(
    private route: ActivatedRoute,
    private placeServ: PlacesService,
    private navCtrl: NavController,
    private router: Router,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers')
        return
      }
      this.sub.add(this.placeServ.getPlace(paramMap.get('placeId')).subscribe(place => {
        this.place = place
        this.initForm()
      }))

    })
  }

  initForm() {
    this.editOfferForm = new FormGroup({
      title: new FormControl(this.place.title, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(this.place.description, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      // price: new FormControl(null, {
      //   updateOn: 'blur',
      //   validators: [Validators.required, Validators.min(1)]
      // }),
      // dateFrom: new FormControl(null, {
      //   updateOn: 'blur',
      //   validators: [Validators.required]
      // }),
      // dateTo: new FormControl(null, {
      //   updateOn: 'blur',
      //   validators: [Validators.required]
      // })
    })
  }

  onUpdateOffer() {
    if (!this.editOfferForm.valid) {
      return
    }
    this.loadingCtrl.create({
      message: 'Updating Place....',
      mode: 'ios'
    }).then(loadingEl => {
      loadingEl.present()
      this.sub.add(this.placeServ.updatePlace(this.place.id,
        this.editOfferForm.value.title,
        this.editOfferForm.value.description).subscribe(() => {
          loadingEl.dismiss()
          this.editOfferForm.reset()
          this.router.navigate(['/places', 'tabs', 'offers'])
        }))
    })

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
