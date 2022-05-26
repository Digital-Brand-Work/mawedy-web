import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	OnInit,
	ViewChild,
} from '@angular/core'
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { BreakPoint } from '@digital_brand_work/models/core.model'
import { ScrollService } from '@digital_brand_work/services/scroll.service'
import { SeoService } from '@digital_brand_work/services/seo.service'
import { MediaService } from '@digital_brand_work/utilities/media.service'
import { PHONE } from 'app/mawedy-core/constants/app.constant'
import { Observable } from 'rxjs'

@Component({
	selector: 'talk-to-us-section1',
	templateUrl: './talk-to-us-section1.component.html',
	styleUrls: ['./talk-to-us-section1.component.scss'],
	animations: [...dbwAnimations],
})
export class TalkToUsSection1Component implements OnInit {
	constructor(
		private cdr: ChangeDetectorRef,
		private _formBuilder: FormBuilder,
		private _seoService: SeoService,
		private _mediaService: MediaService,
		private _scrollService: ScrollService,
	) {
		this._seoService.generateTags({
			title: 'Mawedy | Talk to us Us',
			description: 'Lets have a coffee ',
		})
	}

	@ViewChild('NgForm') NgForm!: NgForm

	@ViewChild('input') input!: ElementRef

	breakpoint$: Observable<BreakPoint> = this._mediaService.breakpoints$

	phone = PHONE

	form: FormGroup = this._formBuilder.group({
		name: ['', Validators.required],
		email: ['', [Validators.required, Validators.email]],
		phone: [''],
		message: ['', Validators.required],
	})

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.input.nativeElement.focus()

		this._scrollService.scrollToTop()

		this.cdr.detectChanges()
	}

	ngOnDestroy(): void {
		this.cdr.detach()
	}
}
