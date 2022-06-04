import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { BehaviorSubject } from 'rxjs'
import { Clinic } from '../clinic.model'
import { ClinicUserService } from '../clinic.service'
import { MapStyles } from './map.styles'

@Component({
	selector: 'clinic-information-map',
	templateUrl: './clinic-information-map.component.html',
	styleUrls: ['./clinic-information-map.component.scss'],
	animations: [...dbwAnimations],
})
export class ClinicInformationMapComponent implements OnInit {
	constructor(private _clinicUserService: ClinicUserService) {}

	@Output() onMarkerDraggedEvent = new EventEmitter<Coordinates>()

	@Input('coordinates') coordinates: Coordinates

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	styles = MapStyles

	ngOnInit(): void {
		setTimeout(() => {
			navigator.geolocation.getCurrentPosition((event) => {
				if (
					this.coordinates.latitude === 0 ||
					this.coordinates.longitude === 0
				) {
					this.coordinates.latitude = event.coords.latitude
					this.coordinates.longitude = event.coords.longitude
				}
			})
		}, 1500)
	}

	onMarkerDragged(coordinates: any) {
		this.coordinates.latitude = coordinates.latLng.lat()

		this.coordinates.longitude = coordinates.latLng.lng()

		this.onMarkerDraggedEvent.emit(this.coordinates)
	}
}

export interface Coordinates {
	latitude: number
	longitude: number
}
