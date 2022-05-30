import { FuseNavigationItem } from './../../../../../@fuse/components/navigation/navigation.types'
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core'
import { BehaviorSubject, combineLatest, Subject, takeUntil } from 'rxjs'
import { FuseMediaWatcherService } from '@fuse/services/media-watcher'
import {
	FuseNavigationService,
	FuseVerticalNavigationComponent,
} from '@fuse/components/navigation'
import { Navigation } from 'app/core/navigation/navigation.types'
import { User } from 'app/core/user/user.types'
import { UserService } from 'app/core/user/user.service'
import { AddAppointmentModal } from 'app/modules/admin/appointments/appointment-add/appointment-add.service'
import { AdminNavigationService } from 'app/mawedy-core/navigation/admin.navigation.service'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { Clinic } from 'app/modules/admin/clinic/clinic.model'

@Component({
	selector: 'classy-layout',
	templateUrl: './classy.component.html',
	encapsulation: ViewEncapsulation.None,
})
export class ClassyLayoutComponent implements OnInit, OnDestroy {
	constructor(
		private _userService: UserService,
		private _fuseMediaWatcherService: FuseMediaWatcherService,
		private _fuseNavigationService: FuseNavigationService,

		private _adminNavigationService: AdminNavigationService,
		private _clinicUserService: ClinicUserService,
		private _addAppointmentModal: AddAppointmentModal,
	) {}

	_unsubscribeAll: Subject<any> = new Subject<any>()

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	opened$: BehaviorSubject<boolean> = this._addAppointmentModal.opened$

	isScreenSmall: boolean

	navigation: Navigation

	user: User

	get currentYear(): number {
		return new Date().getFullYear()
	}

	ngOnInit(): void {
		this._clinicUserService.initialize()

		combineLatest([
			this._clinicUserService.clinic$,
			this._userService.user$,
			this._fuseMediaWatcherService.onMediaChange$,
		])
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe({
				next: (results: any) => {
					const [clinic, user, { matchingAliases }] = results

					if (clinic) {
						this._adminNavigationService
							.get(clinic.subscription_type)
							.pipe(takeUntil(this._unsubscribeAll))
							.subscribe((navigation: FuseNavigationItem[]) => {
								this.navigation = {
									default: navigation,
									compact: navigation,
									futuristic: navigation,
									horizontal: navigation,
								}
							})
					}

					if (user) {
						this.user = user
					}

					if ({ matchingAliases }) {
						this.isScreenSmall = !matchingAliases.includes('md')
					}

					;(
						document.querySelector('html') as HTMLElement
					).style.position = 'fixed'
				},
			})
	}

	ngOnDestroy(): void {
		this._unsubscribeAll.next(null)

		this._unsubscribeAll.complete()
		;(document.querySelector('html') as HTMLElement).style.position =
			'relative'
	}

	toggleNavigation(name: string): void {
		const navigation =
			this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(
				name,
			)

		if (navigation) {
			navigation.toggle()
		}
	}
}
