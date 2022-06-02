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
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { createMask } from '@ngneat/input-mask'
import { countries } from 'app/mawedy-core/constants/countries.constant'
import { BehaviorSubject, Subject, takeUntil } from 'rxjs'
import { AddPatientModal } from './patient-add.service'

@Component({
	selector: 'patient-add',
	templateUrl: './patient-add.component.html',
	styleUrls: ['./patient-add.component.scss'],
	animations: [...dbwAnimations],
})
export class PatientAddComponent implements OnInit {
	constructor(
		@Inject(PLATFORM_ID) private _platformID: Object,
		private _addPatientModal: AddPatientModal,
		private _cdr: ChangeDetectorRef,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	@ViewChild('input') input!: ElementRef

	@ViewChild('comments', { read: ElementRef }) textArea: ElementRef

	unsubscribe$: Subject<any> = new Subject<any>()

	opened$: BehaviorSubject<boolean> = this._addPatientModal.opened$

	emailInputMask = !isPlatformBrowser(this._platformID)
		? null
		: createMask({ alias: 'email' })

	countryJson = countries

	cities: string[] = []

	ngOnInit(): void {}

	identity = (item: any) => item

	onChangeCountry(country: string) {
		this.cities = this.countryJson[country]
	}

	ngAfterViewInit(): void {
		this.opened$.pipe(takeUntil(this.unsubscribe$)).subscribe((focused) => {
			if (focused) {
				this.input.nativeElement.focus()
			}
		})

		this._cdr.detectChanges()
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()

		this._cdr.detach()
	}
}
