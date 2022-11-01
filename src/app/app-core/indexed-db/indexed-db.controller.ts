import { empty } from 'app/app-core/helpers'
import { Injectable } from '@angular/core'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { forkJoin, tap } from 'rxjs'
import { DB } from '../enums/index.db.enum'

@Injectable({ providedIn: 'root' })
export class IndexedDbController {
	constructor(private _indexedDbService: NgxIndexedDBService) {}

	upsert(db: string, data: any): void {
		this._indexedDbService.getByKey(db, 1).subscribe({
			next: () => {
				this._indexedDbService
					.update(db, {
						id: 1,
						...data,
					})
					.subscribe()
			},
			error: () => {
				this._indexedDbService
					.add(db, {
						subscription_request_id: 1,
						...data,
					})
					.subscribe()
			},
		})
	}

	removeAll(databases: any[]) {
		databases.forEach((database) =>
			this._indexedDbService.clear(database).subscribe(),
		)
	}
}
