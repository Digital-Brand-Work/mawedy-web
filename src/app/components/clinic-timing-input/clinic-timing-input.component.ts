import { Component, OnInit, Output, EventEmitter } from '@angular/core'

@Component({
	selector: 'clinic-timing-input',
	templateUrl: './clinic-timing-input.component.html',
	styleUrls: ['./clinic-timing-input.component.scss'],
})
export class ClinicTimingInputComponent implements OnInit {
	constructor() {}

	@Output() onChangeTime = new EventEmitter<{ start: any; end: any }>()

	time = {
		start: '6 AM',
		end: '5 PM',
	}

	timingsAM: string[] = []

	timingsPM: string[] = []

	ngOnInit(): void {
		for (let i = 1; i <= 12; i++) {
			this.timingsAM.push(i + ' AM')
		}

		for (let i = 1; i <= 12; i++) {
			this.timingsPM.push(i + ' PM')
		}
	}

	identity = (item: any) => item
}
