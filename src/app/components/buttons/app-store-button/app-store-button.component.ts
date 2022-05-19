import { Component, OnInit } from '@angular/core'
import { BreakPoint } from '@digital_brand_work/models/core.model'
import { MediaService } from '@digital_brand_work/utilities/media.service'
import { Observable } from 'rxjs'

@Component({
	selector: 'app-store-button',
	templateUrl: './app-store-button.component.html',
	styleUrls: ['./app-store-button.component.scss'],
})
export class AppStoreButtonComponent implements OnInit {
	constructor(private _mediaService: MediaService) {}

	breakpoint$: Observable<BreakPoint> = this._mediaService.breakpoints$

	ngOnInit(): void {}
}
