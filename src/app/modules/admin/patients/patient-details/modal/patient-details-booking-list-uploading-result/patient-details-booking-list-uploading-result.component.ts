import { dbwAnimations } from './../../../../../../../@digital_brand_work/animations/animation.api'
import { Component, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { UploadResultModal } from './patient-details-booking-list-uploading-result.service'

@Component({
	selector: 'patient-details-booking-list-uploading-result',
	templateUrl:
		'./patient-details-booking-list-uploading-result.component.html',
	styleUrls: [
		'./patient-details-booking-list-uploading-result.component.scss',
	],
	animations: [...dbwAnimations],
})
export class PatientDetailsBookingListUploadingResultComponent
	implements OnInit
{
	constructor(private _uploadResultModal: UploadResultModal) {}

	opened$: BehaviorSubject<boolean> = this._uploadResultModal.opened$

	file$: BehaviorSubject<string> = this._uploadResultModal.file$

	width: number = 1

	timer: any

	ngOnInit(): void {
		this.timer = setInterval(() => {
			this.width += 30
		}, 50)
	}

	ngOnDestroy(): void {
		clearInterval(this.timer)
	}
}
