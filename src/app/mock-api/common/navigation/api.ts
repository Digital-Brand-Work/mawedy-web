import { Injectable } from '@angular/core'
import { cloneDeep } from 'lodash-es'
import { FuseNavigationItem } from '@fuse/components/navigation'
import { FuseMockApiService } from '@fuse/lib/mock-api'
import {
	compactNavigation,
	defaultNavigation,
	futuristicNavigation,
	horizontalNavigation,
} from 'app/mock-api/common/navigation/data'

@Injectable({
	providedIn: 'root',
})
export class NavigationMockApi {
	private readonly _compactNavigation: FuseNavigationItem[] =
		compactNavigation
	private readonly _defaultNavigation: FuseNavigationItem[] =
		defaultNavigation
	private readonly _futuristicNavigation: FuseNavigationItem[] =
		futuristicNavigation
	private readonly _horizontalNavigation: FuseNavigationItem[] =
		horizontalNavigation

	constructor(private _fuseMockApiService: FuseMockApiService) {
		// Register Mock API handlers
		this.registerHandlers()
	}

	registerHandlers(): void {
		this._fuseMockApiService.onGet('api/common/navigation').reply(() => {
			this._compactNavigation.forEach((compactNavItem) => {
				this._defaultNavigation.forEach((defaultNavItem) => {
					if (defaultNavItem.id === compactNavItem.id) {
						compactNavItem.children = cloneDeep(
							defaultNavItem.children,
						)
					}
				})
			})

			this._futuristicNavigation.forEach((futuristicNavItem) => {
				this._defaultNavigation.forEach((defaultNavItem) => {
					if (defaultNavItem.id === futuristicNavItem.id) {
						futuristicNavItem.children = cloneDeep(
							defaultNavItem.children,
						)
					}
				})
			})

			this._horizontalNavigation.forEach((horizontalNavItem) => {
				this._defaultNavigation.forEach((defaultNavItem) => {
					if (defaultNavItem.id === horizontalNavItem.id) {
						horizontalNavItem.children = cloneDeep(
							defaultNavItem.children,
						)
					}
				})
			})

			return [
				200,
				{
					compact: cloneDeep(this._compactNavigation),
					default: cloneDeep(this._defaultNavigation),
					futuristic: cloneDeep(this._futuristicNavigation),
					horizontal: cloneDeep(this._horizontalNavigation),
				},
			]
		})
	}
}
