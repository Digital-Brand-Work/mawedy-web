import { isPlatformBrowser } from '@angular/common'
import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	Inject,
	OnInit,
	PLATFORM_ID,
	ViewChild,
} from '@angular/core'
import { createMask } from '@ngneat/input-mask'

@Component({
	selector: 'clinic-information',
	templateUrl: './clinic-information.component.html',
	styleUrls: ['./clinic-information.component.scss'],
})
export class ClinicInformationComponent implements OnInit {
	constructor(
		@Inject(PLATFORM_ID) private _platformID: Object,
		private _cdr: ChangeDetectorRef,
	) {}

	@ViewChild('input') input: ElementRef

	@ViewChild('clinicDescription', { read: ElementRef })
	textArea!: ElementRef

	clinicDescription: ElementRef

	emailInputMask = !isPlatformBrowser(this._platformID)
		? null
		: createMask({ alias: 'email' })

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		// this.input.nativeElement.focus()

		this._cdr.detectChanges()
	}

	ngOnDestroy(): void {
		this._cdr.detach()
	}

	autoGrow() {
		const textArea = this.textArea.nativeElement

		textArea.style.overflow = 'hidden'

		textArea.style.height = '0px'

		textArea.style.height = textArea.scrollHeight + 'px'
	}
}
