import { Component, OnInit } from '@angular/core'
import { BreakPoint } from '@digital_brand_work/models/core.model'
import { MediaService } from '@digital_brand_work/utilities/media.service'
import { Observable } from 'rxjs'

@Component({
	selector: 'google-play-button',
	templateUrl: './google-play-button.component.html',
	styleUrls: ['./google-play-button.component.scss'],
})
export class GooglePlayButtonComponent implements OnInit {
	constructor(private _mediaService: MediaService) {}

	breakpoint$: Observable<BreakPoint> = this._mediaService.breakpoints$

	ngOnInit(): void {}
}
