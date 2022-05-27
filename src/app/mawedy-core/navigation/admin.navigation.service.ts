import { BehaviorSubject, Observable, of, zip } from 'rxjs'
import { Injectable } from '@angular/core'
import { FuseNavigationItem } from '@fuse/components/navigation'
import { slugify } from '@digital_brand_work/helpers/helpers'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { Clinic } from 'app/modules/admin/clinic/clinic.model'
import { ClinicSubscriptionType } from '../enums/clinic-subscription-type.enum'

@Injectable({ providedIn: 'root' })
export class AdminNavigationService {
	constructor(private _clinicUserService: ClinicUserService) {
		this.clinic$.subscribe((clinic) => {
			this.clinic = slugify(clinic.name)

			this.branch = slugify(
				clinic.accounts.length === 0 ? clinic.line_one : clinic[0].name,
			)
		})
	}

	clinic: string = ''

	branch: string = ''

	clinic$: BehaviorSubject<Clinic> = this._clinicUserService.clinic$

	branch$: BehaviorSubject<Clinic> = this._clinicUserService.clinic$

	navigation: FuseNavigationItem[] = [
		{
			id: '1',
			title: 'Dashboard',
			type: 'basic',
			icon: 'dashboard',
			link: `/${this.clinic}/${this.branch}/dashboard`,
		},
		{
			id: '2',
			title: 'Appointments',
			type: 'basic',
			icon: 'alarm',
			link: `/${this.clinic}/${this.branch}/appointments`,
		},
		{
			id: '3',
			title: 'Doctor Profile',
			type: 'basic',
			icon: 'earbuds',
			link: `/${this.clinic}/${this.branch}/doctors`,
		},
		{
			id: '4',
			title: 'Patients',
			type: 'basic',
			icon: 'group',
			link: `/${this.clinic}/${this.branch}/patients`,
		},
		{
			id: '5',
			title: 'Clinic Profile',
			type: 'basic',
			icon: 'room_preferences',
			link: `/${this.clinic}/${this.branch}/clinic`,
		},
		{
			id: '6',
			title: 'Promotions',
			type: 'basic',
			icon: 'label',
			link: `/${this.clinic}/${this.branch}/promotions`,
		},
		{
			id: '7',
			title: 'Subscription',
			type: 'basic',
			icon: 'notifications_active',
			link: `/${this.clinic}/${this.branch}/subscription`,
		},
	]

	standardUser: FuseNavigationItem[] = []

	goldenUser: FuseNavigationItem[] = []

	platinumUser: FuseNavigationItem[] = [...this.navigation]

	onTrialUser: FuseNavigationItem[] = [...this.platinumUser]

	get(
		subscription: ClinicSubscriptionType,
	): Observable<FuseNavigationItem[]> {
		if (subscription === 'Free') {
			of(this.onTrialUser)
		}

		if (subscription === 'Standard') {
			of(this.standardUser)
		}

		if (subscription === 'Golden') {
			of(this.goldenUser)
		}

		if (subscription === 'Platinum') {
			of(this.platinumUser)
		}

		return of(this.onTrialUser)
	}
}
