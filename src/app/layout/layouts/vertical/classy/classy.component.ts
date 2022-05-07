import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core'
import { BehaviorSubject, Subject, takeUntil } from 'rxjs'
import { FuseMediaWatcherService } from '@fuse/services/media-watcher'
import {
	FuseNavigationService,
	FuseVerticalNavigationComponent,
} from '@fuse/components/navigation'
import { Navigation } from 'app/core/navigation/navigation.types'
import { NavigationService } from 'app/core/navigation/navigation.service'
import { User } from 'app/core/user/user.types'
import { UserService } from 'app/core/user/user.service'
import { AddAppointmentModal } from 'app/modules/admin/appointments/appointment-add/appointment-add.service'

@Component({
	selector: 'classy-layout',
	templateUrl: './classy.component.html',
	encapsulation: ViewEncapsulation.None,
})
export class ClassyLayoutComponent implements OnInit, OnDestroy {
	constructor(
		private _navigationService: NavigationService,
		private _userService: UserService,
		private _fuseMediaWatcherService: FuseMediaWatcherService,
		private _fuseNavigationService: FuseNavigationService,

		private addAppointmentModal: AddAppointmentModal,
	) {}

	private _unsubscribeAll: Subject<any> = new Subject<any>()

	opened$: BehaviorSubject<boolean> = this.addAppointmentModal.opened$

	isScreenSmall: boolean

	navigation: Navigation

	user: User

	get currentYear(): number {
		return new Date().getFullYear()
	}

	ngOnInit(): void {
		this._navigationService.navigation$
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe((navigation: Navigation) => {
				this.navigation = navigation
			})

		this._userService.user$
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe((user: User) => {
				this.user = user
			})

		this._fuseMediaWatcherService.onMediaChange$
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe(({ matchingAliases }) => {
				this.isScreenSmall = !matchingAliases.includes('md')
			})
		;(document.querySelector('html') as HTMLElement).style.position =
			'fixed'
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
