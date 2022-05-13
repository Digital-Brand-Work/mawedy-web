import { Component, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { ConfirmDeleteDoctorModal } from './doctor-confirm-delete.service'

@Component({
	selector: 'doctor-confirm-delete',
	templateUrl: './doctor-confirm-delete.component.html',
	styleUrls: ['./doctor-confirm-delete.component.scss'],
})
export class DoctorConfirmDeleteComponent implements OnInit {
	constructor(private confirmDeleteDoctorModal: ConfirmDeleteDoctorModal) {}

	opened$: BehaviorSubject<boolean> = this.confirmDeleteDoctorModal.opened$

	ngOnInit(): void {}
}
