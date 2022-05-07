import { Component, HostListener, OnInit } from '@angular/core'
import { createMask } from '@ngneat/input-mask'

@Component({
	selector: 'patient-details-information',
	templateUrl: './patient-details-information.component.html',
	styleUrls: ['./patient-details-information.component.scss'],
})
export class PatientDetailsInformationComponent implements OnInit {
	constructor() {}

	@HostListener('document:keydown.escape')
	back() {
		history.back()
	}

	emailInputMask = createMask({ alias: 'email' })

	ngOnInit(): void {
		;(document.querySelector('html') as HTMLElement).style.position =
			'fixed'
	}

	ngOnDestroy(): void {
		;(document.querySelector('html') as HTMLElement).style.position =
			'relative'
	}
}
