import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'

@Component({
	selector: 'waiting-patients-table',
	templateUrl: './waiting-patients-table.component.html',
	styleUrls: ['./waiting-patients-table.component.scss'],
	animations: [...dbwAnimations],
})
export class WaitingPatientsTableComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	identity = (item: any) => item
}
