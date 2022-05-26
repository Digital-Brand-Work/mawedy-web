import {
	Component,
	EventEmitter,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core'
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms'

@Component({
	selector: 'card-number-form',
	templateUrl: './card-number-form.component.html',
	styleUrls: ['./card-number-form.component.scss'],
})
export class CardNumberFormComponent implements OnInit {
	constructor(private _formBuilder: FormBuilder) {}

	@Output() onCardNumberChange = new EventEmitter<string>()

	@ViewChild('ngForm') ngForm?: NgForm

	form: FormGroup = this._formBuilder.group({
		card_number: ['', Validators.required],
	})

	ngOnInit(): void {}

	isValid(digits: any) {
		let sum = 0

		for (let i = 0; i < digits.length; i++) {
			let cardNum = parseInt(digits[i])

			if ((digits.length - i) % 2 === 0) {
				cardNum = cardNum * 2

				if (cardNum > 9) {
					cardNum = cardNum - 9
				}
			}

			sum += cardNum
		}

		return sum % 10 === 0
	}
}
