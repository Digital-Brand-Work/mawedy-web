import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	HostListener,
	OnInit,
	ViewChild,
} from '@angular/core'
import { createMask } from '@ngneat/input-mask'

@Component({
	selector: 'patient-details-information',
	templateUrl: './patient-details-information.component.html',
	styleUrls: ['./patient-details-information.component.scss'],
})
export class PatientDetailsInformationComponent implements OnInit {
	constructor(private cdr: ChangeDetectorRef) {}

	@HostListener('document:keydown.escape')
	back() {
		history.back()
	}

	@ViewChild('input') input?: ElementRef

	emailInputMask = createMask({ alias: 'email' })

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.input.nativeElement.focus()

		this.cdr.detectChanges()
	}

	ngOnDestroy(): void {
		this.cdr.detach()
	}
}
