import { AuthService } from './../auth/auth.service';
import { Place } from './place.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([
    new Place(
      'p1',
      'Manhattan Mansion',
      'In the heart of New York City.',
      'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
      149.99,
      new Date('2019-01-01'),
      new Date('2020-12-31'),
      'abc'
    ),
    new Place(
      'p2',
      "L'Amour Toujours",
      'A romantic place in Paris!',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Paris_Night.jpg/1024px-Paris_Night.jpg',
      189.99,
      new Date('2019-01-01'),
      new Date('2020-12-31'),
      'xyz'
    ),
    new Place(
      'p3',
      'The Foggy Palace',
      'Not your average city trip!',
      'https://upload.wikimedia.org/wikipedia/commons/0/01/San_Francisco_with_two_bridges_and_the_fog.jpg',
      99.99,
      new Date('2019-01-01'),
      new Date('2020-12-31'),
      'abc'
    ),
  ]);
  constructor(private authServ: AuthService) { }

  get Places() {
    // return [...this._places]
    return this._places.asObservable()
  }

  getPlace(id: string) {
    // let a = this._places.find(p => {
    //   return p.id === id
    // })
    // return a
    return this.Places.pipe(
      take(1),
      map(places => {
        return { ...places.find(p => p.id === id) }
      })
    )
  }

  addPlace(title: string, description: string, price: number, datefrom: Date, dateTo: Date) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://upload.wikimedia.org/wikipedia/commons/0/01/San_Francisco_with_two_bridges_and_the_fog.jpg',
      price,
      datefrom,
      dateTo,
      this.authServ.userId
    )
    // this._places.push(newPlace)
    this.Places.pipe(take(1)).subscribe(places => {
      this._places.next(places.concat(newPlace))
    })
  }

  updatePlace(placeId: string, title: string, description: string) {
    console.log(placeId, title, description);
    return this.Places.pipe(
      take(1),
      delay(1000),
      tap(places => {
        const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId)
        const updatedPlaces = [...places]
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        )
        this._places.next(updatedPlaces)
      })
    )
  }

}
