import { Branch } from './../../../modules/admin/clinic/clinic.model'
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	Input,
	OnDestroy,
	OnInit,
	ViewEncapsulation,
} from '@angular/core'
import { Router } from '@angular/router'
import { BooleanInput } from '@angular/cdk/coercion'
import { BehaviorSubject, combineLatest, forkJoin, Observable, Subject, take, takeUntil } from 'rxjs'
import { User } from 'app/core/user/user.types'
import { UserService } from 'app/core/user/user.service'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { Clinic } from 'app/modules/admin/clinic/clinic.model'
import { AddAppointmentModal } from 'app/modules/admin/appointments/appointment-add/appointment-add.service'
import { MediaService } from '@digital_brand_work/utilities/media.service'
import { BreakPoint } from '@digital_brand_work/models/core.model'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { SwitchAccountApi } from './user.switch.api.service'
import { AlertState } from 'app/components/alert/alert.service'

@Component({
	selector: 'user',
	templateUrl: './user.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	exportAs: 'user',
	animations: [...dbwAnimations],
})
export class UserComponent implements OnInit, OnDestroy {
	constructor(
		private _router: Router,
		private _alert: AlertState,
		private _userService: UserService,
		private _mediaService: MediaService,
		private _changeDetectorRef: ChangeDetectorRef,
		private _clinicUserService: ClinicUserService,
		private _addAppointmentModal: AddAppointmentModal,
		private _switchAccountApi: SwitchAccountApi,
	) {}

	@Input() showAvatar: boolean = true

	ngAcceptInputType_showAvatar: BooleanInput

	user: User

	breakpoint$: Observable<BreakPoint> = this._mediaService.breakpoints$

	unsubscribe$: Subject<any> = new Subject<any>()

	opened$: BehaviorSubject<boolean> = this._addAppointmentModal.opened$

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	ngOnInit(): void {
		this._userService.user$.pipe(takeUntil(this.unsubscribe$)).subscribe((user: User) => {
			this.user = user

			this._changeDetectorRef.markForCheck()
		})
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
	}

	identity = (item: any): any => item

	resolvePath(path: string): void {
		this._clinicUserService
			.resolveClinicPath()
			.pipe(take(1))
			.subscribe((resolvedPath) => {
				this._router.navigate([resolvedPath + path])
			})
	}

	updateUserStatus(status: string): void {
		if (!this.user) {
			return
		}

		this._userService
			.update({
				...this.user,
				status,
			})
			.subscribe()
	}

	switchAccount(branch_id?: string): void {
		let data: any = { type: 'Main' }

		if (branch_id) {
			data = {
				id: branch_id,
				type: 'Branch',
			}
		}

		combineLatest([this.clinic$, this._switchAccountApi.post({ ...data })])
			.pipe(take(1))
			.subscribe((results) => {
				const [clinic, account] = results

				let userAccount: any = { ...account }

				if (data.type === 'Branch') {
					userAccount.data.name = account.data.branch_name || account.data.clinic.name

					userAccount.data.line_one = account.data.clinic.line_one

					userAccount.data.branch_address = account.data.branch_address

					userAccount.data.banner = account.data.clinic.banner

					userAccount.data.timeslots = account.data.timeslots || []

					userAccount.data.accounts = clinic.accounts
				}

				this._clinicUserService.saveDataLocally(userAccount)

				this._alert.add({
					id: Math.floor(Math.random() * 100000000000).toString(),
					title: `Welcome Back ${userAccount.data.name}!`,
					message: 'We hope that you use our services to its full extent. Have a great day ahead.',
					type: 'info',
				})
			})
	}

	signOut(): void {
		this._clinicUserService.logout()
	}
}
