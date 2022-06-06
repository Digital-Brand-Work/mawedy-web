import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { BehaviorSubject } from 'rxjs'
import { Doctor } from '../../doctor.model'
import { DoctorService } from '../../doctor.service'
import { ConfirmDeleteDoctorModal } from './doctor-confirm-delete.service'
import * as DoctorActions from '../../doctor.actions'
import { DoctorDetailsModal } from '../doctor-details/doctor-details.service'
@Component({
	selector: 'doctor-confirm-delete',
	templateUrl: './doctor-confirm-delete.component.html',
	styleUrls: ['./doctor-confirm-delete.component.scss'],
})
export class DoctorConfirmDeleteComponent implements OnInit {
	constructor(
		private _doctorService: DoctorService,
		private _confirmDeleteDoctorModal: ConfirmDeleteDoctorModal,
		private _store: Store<{ doctors: Doctor[] }>,
		private _doctorDetailsModal: DoctorDetailsModal,
	) {}

	opened$: BehaviorSubject<boolean> = this._confirmDeleteDoctorModal.opened$

	doctor$?: BehaviorSubject<Doctor | null> = this._doctorService.current$

	ngOnInit(): void {}

	remove(doctor: Doctor) {
		this._doctorService.remove(doctor.id).subscribe(() => {
			this._store.dispatch(DoctorActions.deleteDoctor({ id: doctor.id }))

			this.opened$.next(false)

			this._doctorDetailsModal.opened$.next(false)
		})
	}
}
