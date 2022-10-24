import { FormGroup, ControlContainer } from '@angular/forms'
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { iso } from 'app/app-core/constants/countries.iso.constant'

@Component({
	selector: 'country-form-field',
	templateUrl: './country-form-field.component.html',
	animations: [...dbwAnimations],
})
export class CountryFormFieldComponent implements OnInit {
	constructor(private _controlContainer: ControlContainer) {}

	readonly COUNTRIES = iso

	@Output()
	onChangeCity = new EventEmitter<string>()

	@Input()
	form?: FormGroup

	@Input()
	name?: string

	@Input()
	placeholder: string = ''

	ngOnInit(): void {
		this.form = <FormGroup>this._controlContainer.control
	}

	trackByFn(index: number, item: any): any {
		return item.id || index
	}
}
