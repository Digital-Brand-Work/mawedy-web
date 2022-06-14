import { Branch } from './../../clinic/clinic.model'
import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { dbwAnimations } from '@digital_brand_work/animations/animation.api'
import { SeoService } from '@digital_brand_work/services/seo.service'
import { AlertState } from 'app/components/alert/alert.service'
import { IndexedDbController } from 'app/mawedy-core/indexed-db/indexed-db.controller'
import { ErrorHandlerService } from 'app/misc/error-handler.service'
import { BehaviorSubject, Subject, take, takeUntil } from 'rxjs'
import { Clinic } from '../../clinic/clinic.model'
import { ClinicUserService } from '../../clinic/clinic.service'
import { empty } from 'app/mawedy-core/helpers'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { HttpClient } from '@angular/common/http'
import { BaseService } from '@digital_brand_work/api/base.api'
import { DB } from 'app/mawedy-core/enums/index.db.enum'
import { FuseConfirmationService } from '@fuse/services/confirmation'
import { result } from 'lodash'
import { format } from 'path'

@Component({
	selector: 'user-accounts',
	templateUrl: './user-accounts.component.html',
	styleUrls: ['./user-accounts.component.scss'],
	animations: [...dbwAnimations],
})
export class UserAccountsComponent implements OnInit {
	constructor(
		private _http: HttpClient,
		private _alert: AlertState,
		private _cdr: ChangeDetectorRef,
		private _seoService: SeoService,
		private _formBuilder: FormBuilder,
		private _clinicUserService: ClinicUserService,
		private _indexedDBService: NgxIndexedDBService,
		private _indexDbController: IndexedDbController,
		private _errorHandlerService: ErrorHandlerService,
		private _indexedDBController: IndexedDbController,
		private _confirm: FuseConfirmationService,
	) {}

	clinic$: BehaviorSubject<Clinic | null> = this._clinicUserService.clinic$

	branches: Branch[] = []

	unsubscribe$: Subject<any> = new Subject<any>()

	form: FormGroup = this._formBuilder.group({
		accounts: this._formBuilder.array([]),
	})

	errors = {}

	isProcessing: boolean = false

	ngOnInit(): void {
		this.clinic$.pipe(take(1)).subscribe((clinic) => {
			if (clinic) {
				this._seoService.generateTags({
					title: `${clinic.name} | ${clinic?.address} | Settings`,
				})

				this.branches = clinic.accounts as Branch[]

				this.form.get('accounts')?.setValue([])

				const control = this.form.get('accounts') as FormArray

				clinic.accounts.forEach((branch) => {
					control.push(
						this._formBuilder.group({
							id: [branch.id],
							name: [branch.name || '', [Validators.required]],
							description: [
								branch.description || '',
								[Validators.required],
							],
							logo_preview: [
								branch.logo ? branch.logo.picture.url : '',
							],
							active: [branch.active ? branch.active : false],
							logo_picture: [undefined],
						}),
					)
				})
			}
		})
	}

	readFile(index: number, event: any) {
		this.form.value.accounts[index].logo_picture = event.target.files[0]

		const reader = new FileReader()

		reader.readAsDataURL(event.target.files[0])

		reader.onload = (_event) => {
			this.form.value.accounts[index].logo_preview = reader.result
		}
	}

	addAccount() {
		const control = this.form.get('accounts') as FormArray

		control.push(
			this._formBuilder.group({
				id: [''],
				name: ['', Validators.required],
				description: ['', Validators.required],
				logo_preview: [''],
				active: [true],
				logo_picture: [undefined],
			}),
		)
	}

	identity = (item: any) => item

	save() {
		let form = new FormData()

		for (
			let i = 0;
			i < this.form.value.accounts.length &&
			this.form.value.accounts[i]['id'] !== '';
			i++
		) {
			let account = this.form.value.accounts[i]

			if (account['id'] !== '') {
				for (let key in account) {
					if (
						key === 'logo_picture' &&
						key['logo_picture'] instanceof File === false
					) {
						account[key] = ''
					}

					form.append(`accounts[${i}][${key}]`, account[key])
				}
			}
		}

		new BaseService(
			this._http,
			this._indexedDBService,
			'v1/accounts/update',
		)
			.post(form)
			.subscribe({
				next: (data: any) => {
					this._clinicUserService.update()

					this._clinicUserService.clinic$
						.pipe(take(1))
						.subscribe((clinic) => {
							this.clinic$.next({
								...clinic,
								accounts: data.data,
							})

							this._indexedDBController.upsert(DB.CLINIC, {
								data: {
									...clinic,
									accounts: data.data,
								},
							})

							this._alert.add({
								id: Math.floor(
									Math.random() * 100000000000,
								).toString(),
								title: `Accounts updated!`,
								message:
									'Your accounts was successfully updated',
								type: 'success',
							})
						})
				},
				error: (http) => {
					for (let key in http.error.errors) {
						for (let errorKey in this.errors) {
							if (key.includes(errorKey)) {
								this.errors[errorKey] = true
							}
						}
					}

					this._errorHandlerService.handleError(http)
				},
			})

		this.resolveNewBranches()
	}

	resolveNewBranches() {
		this.clinic$.pipe(take(1)).subscribe((clinic) => {
			let newUsers: number = 0

			this.form.value.accounts.forEach((account) => {
				if (account.id === '') {
					newUsers++
				}
			})

			if (newUsers !== 0) {
				const confirm = this._confirm.open({
					title: `You have Added ${newUsers} users`,
					message: `Bill will be reflected on your next ${
						clinic.subscription_interval === 'year'
							? 'yearly'
							: 'monthly'
					} invoice. Additional Fee: AED ${
						newUsers *
						60 *
						(clinic.subscription_interval === 'year' ? 12 : 1)
					}`,
				})

				confirm.afterClosed().subscribe((result) => {
					if (!result) {
						return
					}

					let accounts = []

					this.form.value.accounts.forEach(
						(account: [key: string], index: number) => {
							if (account['id'] === '') {
								accounts.push(account)
							}
						},
					)

					accounts.forEach((account) => {
						let form = new FormData()

						for (let key in account) {
							form.append(key, account[key])
						}
						new BaseService(
							this._http,
							this._indexedDBService,
							'v1/accounts/add',
						)
							.post(form)
							.subscribe({
								next: (data: any) => {
									this._alert.add({
										id: Math.floor(
											Math.random() * 100000000000,
										).toString(),
										title: `An account has been added successfully`,
										message: `${data.data.name} is now a new branch!`,
										type: 'success',
									})
								},
								error: (http) => {
									for (let key in http.error.errors) {
										for (let errorKey in this.errors) {
											if (key.includes(errorKey)) {
												this.errors[errorKey] = true
											}
										}
									}

									this._errorHandlerService.handleError(http)
								},
							})
					})
				})
			}
		})
	}
}
