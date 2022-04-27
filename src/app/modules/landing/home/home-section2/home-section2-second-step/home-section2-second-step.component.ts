import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core'

@Component({
	selector: 'home-section2-second-step',
	templateUrl: './home-section2-second-step.component.html',
	styleUrls: ['./home-section2-second-step.component.scss'],
})
export class HomeSection2SecondStepComponent implements OnInit {
	constructor(private cdr: ChangeDetectorRef) {}

	@Output() onBack = new EventEmitter()

	@ViewChild('input') input!: ElementRef

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.cdr.detectChanges()

		this.input.nativeElement.focus()
	}

	ngOnDestroy(): void {
		this.cdr.detach()
	}
}
