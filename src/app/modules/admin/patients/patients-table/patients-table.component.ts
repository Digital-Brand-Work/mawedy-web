import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'patients-table',
	templateUrl: './patients-table.component.html',
	styleUrls: ['./patients-table.component.scss'],
	animations: [...dbwAnimations],
})
export class PatientsTableComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	identity = (item: any) => item
}
