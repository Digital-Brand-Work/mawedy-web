import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	OnInit,
	ViewChild,
} from '@angular/core'
import { createMask } from '@ngneat/input-mask'

@Component({
	selector: 'clinic-information',
	templateUrl: './clinic-information.component.html',
	styleUrls: ['./clinic-information.component.scss'],
})
export class ClinicInformationComponent implements OnInit {
	constructor(private cdr: ChangeDetectorRef) {}

	@ViewChild('input') input: ElementRef

	@ViewChild('clinicDescription', { read: ElementRef })
	textArea!: ElementRef

	clinicDescription: ElementRef

	emailInputMask = createMask({ alias: 'email' })

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		// this.input.nativeElement.focus()

		this.cdr.detectChanges()
	}

	ngOnDestroy(): void {
		this.cdr.detach()
	}

	autoGrow() {
		const textArea = this.textArea.nativeElement

		textArea.style.overflow = 'hidden'

		textArea.style.height = '0px'

		textArea.style.height = textArea.scrollHeight + 'px'
	}
}
