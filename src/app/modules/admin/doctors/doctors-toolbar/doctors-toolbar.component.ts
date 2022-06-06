import { Doctor } from './../doctor.model'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { AddDoctorModal } from '../modals/doctor-add/doctor-add.service'

@Component({
	selector: 'doctors-toolbar',
	templateUrl: './doctors-toolbar.component.html',
	styleUrls: ['./doctors-toolbar.component.scss'],
})
export class DoctorsToolbarComponent implements OnInit {
	constructor(private addDoctorModal: AddDoctorModal) {}

	@Output() onSearch = new EventEmitter()

	@Output() onFilter = new EventEmitter()

	@Input() doctors: Doctor[] = []

	keyword: string = ''

	opened$: BehaviorSubject<boolean> = this.addDoctorModal.opened$

	ngOnInit(): void {}
}
