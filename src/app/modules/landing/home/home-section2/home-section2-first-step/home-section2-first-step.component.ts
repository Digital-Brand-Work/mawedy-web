import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'

@Component({
	selector: 'home-section2-first-step',
	templateUrl: './home-section2-first-step.component.html',
	styleUrls: ['./home-section2-first-step.component.scss'],
	animations: [...dbwAnimations],
})
export class HomeSection2FirstStepComponent implements OnInit {
	constructor() {}

	@Output() onNext = new EventEmitter()

	@Input() step: 'one' | 'two' = 'one'

	ngOnInit(): void {}
}
