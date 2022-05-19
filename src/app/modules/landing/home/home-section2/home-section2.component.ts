import { BehaviorSubject, Observable } from 'rxjs'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { Component, OnInit } from '@angular/core'
import { MediaService } from '@digital_brand_work/utilities/media.service'
import { BreakPoint } from '@digital_brand_work/models/core.model'

@Component({
	selector: 'home-section2',
	templateUrl: './home-section2.component.html',
	styleUrls: ['./home-section2.component.scss'],
	animations: [...dbwAnimations],
})
export class HomeSection2Component implements OnInit {
	constructor(private _mediaService: MediaService) {}

	breakpoint$: Observable<BreakPoint> = this._mediaService.breakpoints$

	description: string =
		'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis .'

	ngOnInit(): void {}
}
