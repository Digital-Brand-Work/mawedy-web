import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { BehaviorSubject } from 'rxjs'
import { Doctor } from '../../doctor.model'
import { DoctorService } from '../../doctor.service'
import { ConfirmDeleteDoctorModal } from './doctor-confirm-delete.service'
import * as DoctorActions from '../../doctor.actions'
import { DoctorDetailsModal } from '../doctor-details/doctor-details.service'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { DB } from 'app/mawedy-core/enums/index.db.enum'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
@Component({
	selector: 'doctor-confirm-delete',
	templateUrl: './doctor-confirm-delete.component.html',
	styleUrls: ['./doctor-confirm-delete.component.scss'],
	animations: [...dbwAnimations],
})
export class DoctorConfirmDeleteComponent implements OnInit {
	constructor(
		private _doctorService: DoctorService,
		private _confirmDeleteDoctorModal: ConfirmDeleteDoctorModal,
		private _store: Store<{ doctors: Doctor[] }>,
		private _doctorDetailsModal: DoctorDetailsModal,
		private _indexDBService: NgxIndexedDBService,
	) {}

	opened$: BehaviorSubject<boolean> = this._confirmDeleteDoctorModal.opened$

	doctor$?: BehaviorSubject<Doctor | null> = this._doctorService.current$

	ngOnInit(): void {}

	remove(doctor: Doctor) {
		this._doctorService.remove(doctor.id).subscribe(() => {
			this._indexDBService.delete(DB.DOCTORS, doctor.id).subscribe(() => {
				this._store.dispatch(
					DoctorActions.deleteDoctor({ id: doctor.id }),
				)

				this.opened$.next(false)

				this._doctorDetailsModal.opened$.next(false)
			})
		})
	}
}
