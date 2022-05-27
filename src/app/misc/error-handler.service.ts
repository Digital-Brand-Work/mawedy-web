import { HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AlertState } from 'app/components/alert/alert.service'
import { slugToSentence } from 'app/mawedy-core/helpers'

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {
	constructor(private _alert: AlertState) {}

	handleError(http: HttpErrorResponse) {
		for (let key in http.error.errors) {
			for (let error of http.error.errors[key]) {
				this._alert.add({
					title: `Error in ${slugToSentence(key)}`,
					message: error,
					type: 'error',
					id: Math.floor(Math.random() * 100000000000).toString(),
				})
			}
		}

		if (http.error.key !== undefined) {
			this._alert.add({
				title: `Error in ${slugToSentence(http.error.key)}`,
				message: http.error.message,
				type: 'error',
				id: Math.floor(Math.random() * 100000000000).toString(),
			})
		}
	}
}
