import { environment } from './../../../../../environments/environment'
import { Doctor } from './../doctor.model'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { AddDoctorModal } from '../modals/doctor-add/doctor-add.service'
import { select, Store } from '@ngrx/store'

@Component({
	selector: 'doctors-toolbar',
	templateUrl: './doctors-toolbar.component.html',
	styleUrls: ['./doctors-toolbar.component.scss'],
})
export class DoctorsToolbarComponent implements OnInit {
	constructor(
		private addDoctorModal: AddDoctorModal,
		private store: Store<{ doctors: Doctor[] }>,
	) {}

	@Output() onSearch = new EventEmitter()

	@Output() onFilter = new EventEmitter()

	@Input() doctors: Doctor[] = []

	doctors$?: Observable<Doctor[]> = this.store.pipe(select('doctors'))

	API_URL = environment.api

	token = localStorage.getItem('access_token')

	keyword: string = ''

	opened$: BehaviorSubject<boolean> = this.addDoctorModal.opened$

	ngOnInit(): void {}
}
