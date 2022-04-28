import { Component, ComponentRef, Input, OnInit } from '@angular/core'

@Component({
	selector: 'app-toolbar',
	templateUrl: './app-toolbar.component.html',
	styleUrls: ['./app-toolbar.component.scss'],
})
export class AppToolbarComponent implements OnInit {
	constructor() {}

	@Input() toolbar!: any

	ngOnInit(): void {}
}
