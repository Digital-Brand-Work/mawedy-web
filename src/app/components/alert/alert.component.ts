import { Component, Input, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { Alert } from 'app/mawedy-core/models/utility.models'

@Component({
	selector: 'alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss'],
	animations: [...dbwAnimations],
})
export class AlertComponent implements OnInit {
	constructor() {}

	@Input() alert!: Alert

	ngOnInit(): void {}
}
