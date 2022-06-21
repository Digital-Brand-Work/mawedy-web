import { HttpClient } from '@angular/common/http'
import { BaseService } from '../../../@digital_brand_work/api/base.api'
import { Injectable } from '@angular/core'
import { NgxIndexedDBService } from 'ngx-indexed-db'

@Injectable({ providedIn: 'root' })
export class CheckoutService extends BaseService<any> {
	constructor(http: HttpClient, indexDbService: NgxIndexedDBService) {
		super(http, indexDbService, 'v1/clinic/subscriptions/checkout')
	}

	// * POST *
}

@Injectable({ providedIn: 'root' })
export class BillingService extends BaseService<any> {
	constructor(http: HttpClient, indexDbService: NgxIndexedDBService) {
		super(http, indexDbService, 'v1/clinic/subscriptions/billing')
	}

	// * POST *
}

// {
//     "type": "Golden",
//     "interval": "month",
//     "card": {
//         "number": "4242424242424242",
//         "expiry": {
//             "month": "12",
//             "year": "2023"
//         },
//         "cvc": "123"
//     },
//     "accounts": {
//         "count": 3
//     },
//     "user": {
//         "name": "John Michael Manlupig",
//         "email": "manlupigjohnmichael@gmail.com",
//         "country": "Philippines",
//         "phone_number_one": "+639169258735",
//         "phone_number_one_country_code": "PH"
//     }
// }
