import {
	WeekDay,
	weekDays,
} from './../../../../mawedy-core/constants/app.constant'
import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'clinic-timings',
	templateUrl: './clinic-timings.component.html',
	styleUrls: ['./clinic-timings.component.scss'],
})
export class ClinicTimingsComponent implements OnInit {
	constructor() {}

	weekDays: WeekDay[] = weekDays

	ngOnInit(): void {}

	identity = (item: any) => item
}
