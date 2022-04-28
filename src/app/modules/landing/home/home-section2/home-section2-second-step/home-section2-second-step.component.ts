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

@Component({
	selector: 'home-section2-second-step',
	templateUrl: './home-section2-second-step.component.html',
	styleUrls: ['./home-section2-second-step.component.scss'],
	animations: [...dbwAnimations],
})
export class HomeSection2SecondStepComponent implements OnInit {
	constructor(private cdr: ChangeDetectorRef) {}

	@Output() onBack = new EventEmitter()

	@Input() step: 'one' | 'two' = 'one'

	@ViewChild('input') input!: ElementRef

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.cdr.detectChanges()

		this.input.nativeElement.focus()
	}

	ngOnDestroy(): void {
		this.cdr.detach()
	}

	identity = (item: any) => item
}
