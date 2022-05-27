import { Component, OnInit } from '@angular/core'
import { BreakPoint } from '@digital_brand_work/models/core.model'
import { MediaService } from '@digital_brand_work/utilities/media.service'
import { Observable } from 'rxjs'

@Component({
	selector: 'preview-section',
	templateUrl: './preview-section.component.html',
	styleUrls: ['./preview-section.component.scss'],
})
export class PreviewSectionComponent implements OnInit {
	constructor(private _mediaService: MediaService) {}

	breakpoint$: Observable<BreakPoint> = this._mediaService.breakpoints$

	ngOnInit(): void {}
}
