import { Component, OnInit } from '@angular/core'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { BreakPoint } from '@digital_brand_work/models/core.model'
import { MediaService } from '@digital_brand_work/utilities/media.service'
import { Observable } from 'rxjs'

@Component({
	selector: 'home-section4',
	templateUrl: './home-section4.component.html',
	styleUrls: ['./home-section4.component.scss'],
	animations: [...dbwAnimations],
})
export class HomeSection4Component implements OnInit {
	constructor(private _mediaService: MediaService) {}

	breakpoint$: Observable<BreakPoint> = this._mediaService.breakpoints$

	ngOnInit(): void {}
}
