import { isPlatformBrowser } from '@angular/common'
import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	HostListener,
	Inject,
	OnInit,
	PLATFORM_ID,
	ViewChild,
} from '@angular/core'
import { createMask } from '@ngneat/input-mask'
import { countries } from 'app/mawedy-core/constants/countries.constant'

@Component({
	selector: 'patient-details-information',
	templateUrl: './patient-details-information.component.html',
	styleUrls: ['./patient-details-information.component.scss'],
})
export class PatientDetailsInformationComponent implements OnInit {
	constructor(
		@Inject(PLATFORM_ID) private _platformID: Object,
		private _cdr: ChangeDetectorRef,
	) {}

	@ViewChild('input') input?: ElementRef

	emailInputMask = !isPlatformBrowser(this._platformID)
		? null
		: createMask({ alias: 'email' })

	cities: string[] = []

	countryJson = countries

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.input.nativeElement.focus()

		this._cdr.detectChanges()
	}

	ngOnDestroy(): void {
		this._cdr.detach()
	}

	identity = (item: any) => item

	onChangeCountry(country: string) {
		this.cities = this.countryJson[country]
	}
}
