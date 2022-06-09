import {
	ChangeDetectorRef,
	Component,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	SimpleChanges,
	ViewEncapsulation,
} from '@angular/core'
import { coerceBooleanProperty } from '@angular/cdk/coercion'
import { Subject, takeUntil, combineLatest, BehaviorSubject } from 'rxjs'
import { FuseLoadingService } from '@fuse/services/loading'

@Component({
	selector: 'fuse-loading-bar',
	templateUrl: './loading-bar.component.html',
	styleUrls: ['./loading-bar.component.scss'],
	encapsulation: ViewEncapsulation.None,
	exportAs: 'fuseLoadingBar',
})
export class FuseLoadingBarComponent implements OnChanges, OnInit, OnDestroy {
	constructor(
		private _fuseLoadingService: FuseLoadingService,
		private _cdr: ChangeDetectorRef,
	) {}

	@Input() autoMode: boolean = true

	mode: 'determinate' | 'indeterminate'

	progress: number = 0

	show$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)

	unsubscribe$: Subject<any> = new Subject<any>()

	ngOnChanges(changes: SimpleChanges): void {
		if ('autoMode' in changes) {
			this._fuseLoadingService.setAutoMode(
				coerceBooleanProperty(changes.autoMode.currentValue),
			)
		}
	}

	ngOnInit(): void {}

	ngAfterContentInit(): void {
		combineLatest([
			this._fuseLoadingService.mode$,
			this._fuseLoadingService.progress$,
			this._fuseLoadingService.show$,
		])
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((results) => {
				const [mode, progress, show] = results

				this.mode = mode

				this.progress = progress

				this.show$.next(show)

				this._cdr.detectChanges()
			})
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(null)

		this.unsubscribe$.complete()
	}
}
