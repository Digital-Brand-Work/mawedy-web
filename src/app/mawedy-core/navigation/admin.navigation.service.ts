import { BehaviorSubject, map, Observable, of, take, zip } from 'rxjs'
import { Injectable } from '@angular/core'
import { FuseNavigationItem } from '@fuse/components/navigation'
import { slugify } from '@digital_brand_work/helpers/helpers'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { Clinic } from 'app/modules/admin/clinic/clinic.model'
import { ClinicSubscriptionType } from '../enums/clinic-subscription-type.enum'

@Injectable({ providedIn: 'root' })
export class AdminNavigationService {
	constructor(private _clinicUserService: ClinicUserService) {}

	getNavigation(clinic: string, branch: string): FuseNavigationItem[] {
		return [
			{
				id: '1',
				title: 'Dashboard',
				type: 'basic',
				icon: 'dashboard',
				link: `/${clinic}/${branch}/dashboard`,
			},
			{
				id: '2',
				title: 'Appointments',
				type: 'basic',
				icon: 'alarm',
				link: `/${clinic}/${branch}/appointments`,
			},
			{
				id: '3',
				title: 'Doctor Profile',
				type: 'basic',
				icon: 'earbuds',
				link: `/${clinic}/${branch}/doctors`,
			},
			{
				id: '4',
				title: 'Patients',
				type: 'basic',
				icon: 'group',
				link: `/${clinic}/${branch}/patients`,
			},
			{
				id: '5',
				title: 'Clinic Profile',
				type: 'basic',
				icon: 'room_preferences',
				link: `/${clinic}/${branch}/clinic`,
			},
			{
				id: '6',
				title: 'Promotions',
				type: 'basic',
				icon: 'label',
				link: `/${clinic}/${branch}/promotions`,
			},
			{
				id: '7',
				title: 'Subscription',
				type: 'basic',
				icon: 'notifications_active',
				link: `/${clinic}/${branch}/subscription`,
			},
		]
	}

	clinic$: BehaviorSubject<Clinic> = this._clinicUserService.clinic$

	get(
		subscription: ClinicSubscriptionType,
	): Observable<FuseNavigationItem[]> {
		// TODO: Filter user types

		return this.clinic$.pipe(
			take(1),
			map((clinic) =>
				this.getNavigation(
					slugify(clinic.name),
					slugify(clinic.line_one || clinic.account_type),
				),
			),
		)
	}
}
