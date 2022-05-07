import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'

@Component({
	selector: 'doctors-table',
	templateUrl: './doctors-table.component.html',
	styleUrls: ['./doctors-table.component.scss'],
	animations: [...dbwAnimations],
})
export class DoctorsTableComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	identity = (item: any) => item
}
