import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'

@Component({
	selector: 'user-accounts',
	templateUrl: './user-accounts.component.html',
	styleUrls: ['./user-accounts.component.scss'],
	animations: [...dbwAnimations],
})
export class UserAccountsComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	identity = (item: any) => item
}
