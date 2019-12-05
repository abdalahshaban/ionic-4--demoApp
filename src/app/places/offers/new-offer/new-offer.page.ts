import { Router } from '@angular/router';
import { PlacesService } from './../../places.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  newOfferForm: FormGroup
  constructor(private placeServ: PlacesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.newOfferForm = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      }),
      dateFrom: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      dateTo: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    })
  }

  onCreateOffer() {
    if (!this.newOfferForm.valid) {
      return
    }
    this.placeServ.addPlace(
      this.newOfferForm.value.title,
      this.newOfferForm.value.description,
      +this.newOfferForm.value.price,
      new Date(this.newOfferForm.value.dateFrom),
      new Date(this.newOfferForm.value.dateTo)
    )
    this.newOfferForm.reset()
    this.router.navigate(['/places', 'tabs', 'offers'])
  }

}
