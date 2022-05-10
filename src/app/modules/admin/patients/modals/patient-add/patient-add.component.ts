import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	HostListener,
	OnInit,
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
		private addPatientModal: AddPatientModal,
		private cdr: ChangeDetectorRef,
	) {}

	@HostListener('document:keydown.escape')
	onKeydownHandler() {
		this.opened$.next(false)
	}

	@ViewChild('input') input!: ElementRef

	@ViewChild('comments', { read: ElementRef }) textArea: ElementRef

	unsubscribeAll: Subject<any> = new Subject<any>()

	opened$: BehaviorSubject<boolean> = this.addPatientModal.opened$

	emailInputMask = createMask({ alias: 'email' })

	countries: string[] = []

	countryJson = countries

	cities: string[] = []

	ngOnInit(): void {
		for (let key in countries) {
			this.countries.push(key)
		}
	}

	identity = (item: any) => item

	onChangeCountry(event: any) {
		this.cities = this.countryJson[event.target.value as string]
	}

	ngAfterViewInit(): void {
		this.opened$
			.pipe(takeUntil(this.unsubscribeAll))
			.subscribe((focused) => {
				if (focused) {
					this.input.nativeElement.focus()
				}
			})

		this.cdr.detectChanges()
	}

	ngOnDestroy(): void {
		this.unsubscribeAll.next(null)

		this.unsubscribeAll.complete()

		this.cdr.detach()
	}
}
