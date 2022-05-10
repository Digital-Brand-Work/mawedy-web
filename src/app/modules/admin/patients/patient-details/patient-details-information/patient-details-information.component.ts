import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	HostListener,
	OnInit,
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
	constructor(private cdr: ChangeDetectorRef) {}

	@ViewChild('input') input?: ElementRef

	emailInputMask = createMask({ alias: 'email' })

	cities: string[] = []

	countryJson = countries

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.input.nativeElement.focus()

		this.cdr.detectChanges()
	}

	ngOnDestroy(): void {
		this.cdr.detach()
	}

	identity = (item: any) => item

	onChangeCountry(country: string) {
		this.cities = this.countryJson[country]
	}
}
