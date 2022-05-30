import { Component, OnInit } from '@angular/core'
import { Clinic } from 'app/modules/admin/clinic/clinic.model'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'
import { BehaviorSubject } from 'rxjs'

@Component({
	selector: 'banner-placeholder',
	templateUrl: './banner-placeholder.component.html',
	styleUrls: ['./banner-placeholder.component.scss'],
})
export class BannerPlaceholderComponent implements OnInit {
	constructor(private _clinicUserService: ClinicUserService) {}

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	ngOnInit(): void {}
}
