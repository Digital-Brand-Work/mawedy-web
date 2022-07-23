import { FuseNavigationItem } from './../../../../../@fuse/components/navigation/navigation.types'
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core'
import {
	BehaviorSubject,
	combineLatest,
	Observable,
	Subject,
	take,
	takeUntil,
} from 'rxjs'
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
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { Router } from '@angular/router'
import { BreakPoint } from '@digital_brand_work/models/core.model'
import { MediaService } from '@digital_brand_work/utilities/media.service'
import { LaravelNotificationService } from 'app/misc/laravel.notificaion.service'
import { AnimateBellService } from 'app/layout/common/user/user-bell.service'

@Component({
	selector: 'classy-layout',
	templateUrl: './classy.component.html',
	encapsulation: ViewEncapsulation.None,
	animations: [...dbwAnimations],
})
export class ClassyLayoutComponent implements OnInit, OnDestroy {
	constructor(
		private _router: Router,
		private _userService: UserService,
		private _mediaService: MediaService,
		private _clinicUserService: ClinicUserService,
		private _addAppointmentModal: AddAppointmentModal,
		private _fuseNavigationService: FuseNavigationService,
		private _adminNavigationService: AdminNavigationService,
		private _fuseMediaWatcherService: FuseMediaWatcherService,
		private _laravelNotificationService: LaravelNotificationService,
		private _animateBellService: AnimateBellService,
	) {}

	breakpoint$: Observable<BreakPoint> = this._mediaService.breakpoints$

	media$: Observable<number> = this._mediaService.media$

	unsubscribe$: Subject<any> = new Subject<any>()

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	opened$: BehaviorSubject<boolean> = this._addAppointmentModal.opened$

	animate$ = this._animateBellService.animate$

	animated: boolean

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
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe({
				next: (results: any) => {
					const [clinic, user, { matchingAliases }] = results

					if (clinic) {
						this._laravelNotificationService.init(
							localStorage.getItem('access_token'),
							clinic,
						)

						this._adminNavigationService
							.get(clinic.subscription_type)
							.pipe(takeUntil(this.unsubscribe$))
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

		this.animate$.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {
			this.animated = true

			setTimeout(() => {
				this.animated = false
			}, 5000)
		})
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
		;(document.querySelector('html') as HTMLElement).style.position =
			'relative'
	}

	resolvePath(path: string) {
		this._clinicUserService
			.resolveClinicPath()
			.pipe(take(1))
			.subscribe((resolvedPath) => {
				this._router.navigate([resolvedPath + path])
			})
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
