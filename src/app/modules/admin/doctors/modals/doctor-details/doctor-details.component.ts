import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { Component, HostListener, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { DoctorDetailsModal } from './doctor-details.service'

@Component({
	selector: 'doctor-details',
	templateUrl: './doctor-details.component.html',
	styleUrls: ['./doctor-details.component.scss'],
	animations: [...dbwAnimations],
})
export class DoctorDetailsComponent implements OnInit {
	constructor(private doctorDetailsModal: DoctorDetailsModal) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	opened$: BehaviorSubject<boolean> = this.doctorDetailsModal.opened$

	ngOnInit(): void {}
}
