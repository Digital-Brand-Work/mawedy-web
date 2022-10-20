import { Observable } from 'rxjs'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { Component, OnInit } from '@angular/core'
import { MediaService } from '@digital_brand_work/utilities/media.service'
import { BreakPoint } from '@digital_brand_work/models/core.model'
import {
	FEATURES,
	HomeSection2Feature,
} from 'app/app-core/constants/app.constant'

@Component({
	selector: 'home-section2',
	templateUrl: './home-section2.component.html',
	styleUrls: ['./home-section2.component.scss'],
	animations: [...dbwAnimations],
})
export class HomeSection2Component implements OnInit {
	constructor(private _mediaService: MediaService) {}

	renderAnimation: boolean = false

	breakpoint$: Observable<BreakPoint> = this._mediaService.breakpoints$

	features: HomeSection2Feature[] = FEATURES

	ngOnInit(): void {}

	trackByFn(index: number, item: any): any {
		return item.id || index
	}
}
