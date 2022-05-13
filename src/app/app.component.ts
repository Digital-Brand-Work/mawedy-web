import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { AlertState } from './components/alert/alert.service'
import { Alert } from './mawedy-core/models/utility.models'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	animations: [...dbwAnimations],
})
export class AppComponent {
	constructor(private alert: AlertState) {}

	alerts$: Observable<Alert[]> = this.alert.get()

	identity = (item: any) => item
}
