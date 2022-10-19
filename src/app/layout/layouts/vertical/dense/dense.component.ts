import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subject, takeUntil } from 'rxjs'
import { FuseMediaWatcherService } from '@fuse/services/media-watcher'
import {
	FuseNavigationItem,
	FuseNavigationService,
	FuseVerticalNavigationComponent,
} from '@fuse/components/navigation'
import { Navigation } from 'app/core/navigation/navigation.types'
import { NavigationService } from 'app/core/navigation/navigation.service'
import { AdminNavigationService } from 'app/app-core/navigation/admin.navigation.service'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'

@Component({
	selector: 'dense-layout',
	templateUrl: './dense.component.html',
	encapsulation: ViewEncapsulation.None,
})
export class DenseLayoutComponent implements OnInit, OnDestroy {
	constructor(
		private _fuseMediaWatcherService: FuseMediaWatcherService,
		private _fuseNavigationService: FuseNavigationService,

		private _adminNavigationService: AdminNavigationService,
		private _clinicUserService: ClinicUserService,
	) {}

	isScreenSmall: boolean

	navigation: Navigation

	navigationAppearance: 'default' | 'dense' = 'dense'

	_unsubscribeAll: Subject<any> = new Subject<any>()

	get currentYear(): number {
		return new Date().getFullYear()
	}

	ngOnInit(): void {
		this._clinicUserService.clinic$
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe({
				next: (clinic) => {
					this._adminNavigationService
						.get(clinic.subscription_type)
						.pipe(takeUntil(this._unsubscribeAll))
						.subscribe((navigation: FuseNavigationItem[]) => {
							this.navigation = {
								compact: navigation,
								default: navigation,
								futuristic: navigation,
								horizontal: navigation,
							}
						})
				},
			})

		this._fuseMediaWatcherService.onMediaChange$
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe(({ matchingAliases }) => {
				this.isScreenSmall = !matchingAliases.includes('md')

				this.navigationAppearance = this.isScreenSmall
					? 'default'
					: 'dense'
			})
	}

	ngOnDestroy(): void {
		this._unsubscribeAll.next(null)

		this._unsubscribeAll.complete()
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

	toggleNavigationAppearance(): void {
		this.navigationAppearance =
			this.navigationAppearance === 'default' ? 'dense' : 'default'
	}
}
