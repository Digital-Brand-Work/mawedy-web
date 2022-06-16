import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { Router } from '@angular/router'
import { HomeNav } from 'app/mawedy-core/navigation/landing.navigation'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { Subject, take, takeUntil } from 'rxjs'
import { dashboardTabs } from '../../dashboard.tabs'

@Component({
	selector: 'for-approvals-toolbar',
	templateUrl: './for-approvals-toolbar.component.html',
	styleUrls: ['./for-approvals-toolbar.component.scss'],
})
export class ForApprovalsToolbarComponent implements OnInit {
	constructor(
		private _router: Router,
		private _clinicUserService: ClinicUserService,
	) {
		this._router.events.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
			this.resolveActiveNav()
		})
	}

	@Output() onSearch = new EventEmitter()

	@Output() onFilter = new EventEmitter()

	unsubscribe$: Subject<any> = new Subject<any>()

	activeNavigation: number = 1

	today = new Date(Date.now())

	keyword: string = ''

	dashboardTabs: HomeNav[] = dashboardTabs

	ngOnInit(): void {
		this.resolveActiveNav()
	}

	identity = (item: any) => item

	resolveActiveNav() {
		if (this._router.url.includes('appointments')) {
			this.activeNavigation = 1
		}

		if (this._router.url.includes('outreach')) {
			this.activeNavigation = 2
		}

		if (this._router.url.includes('for-approvals')) {
			this.activeNavigation = 3
		}
	}

	resolvePath(path: string): void {
		this._clinicUserService
			.resolveClinicPath()
			.pipe(take(1))
			.subscribe((resolvedPath) => {
				this._router.navigate([resolvedPath + path])
			})
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
	}
}
