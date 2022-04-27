import { Component, EventEmitter, OnInit, Output } from '@angular/core'

@Component({
	selector: 'home-section2-first-step',
	templateUrl: './home-section2-first-step.component.html',
	styleUrls: ['./home-section2-first-step.component.scss'],
})
export class HomeSection2FirstStepComponent implements OnInit {
	constructor() {}

	@Output() onNext = new EventEmitter()

	ngOnInit(): void {}
}
