import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { ScrollService } from '@digital_brand_work/services/scroll.service'
import { clinicSubscriptionTypes } from 'app/mawedy-core/enums/clinic-subscription-type.enum'

@Component({
	selector: 'partner-with-us-section1-second-step',
	templateUrl: './partner-with-us-section1-second-step.component.html',
	styleUrls: ['./partner-with-us-section1-second-step.component.scss'],
	animations: [...dbwAnimations],
})
export class PartnerWithUsSection1SecondStepComponent implements OnInit {
	constructor(
		private _cdr: ChangeDetectorRef,
		private _scrollService: ScrollService,
	) {}

	@Output() onBack = new EventEmitter()

	@Input() step: 'one' | 'two' = 'one'

	@ViewChild('input') input: ElementRef

	subscriptionTypes: string[] = clinicSubscriptionTypes

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.input.nativeElement.focus()

		setTimeout(() => {
			this._scrollService.scrollToTop()
		}, 50)

		this._cdr.detectChanges()
	}

	ngOnDestroy(): void {
		this._cdr.detach()
	}

	identity = (item: any) => item
}
