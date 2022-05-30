import { environment } from './../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Inject, Injectable, Optional } from '@angular/core'
import { Observable } from 'rxjs'
import { NgxIndexedDBService } from 'ngx-indexed-db'

@Injectable({
	providedIn: 'root',
})
export class BaseService<T> {
	constructor(
		@Optional() public http: HttpClient,
		@Optional() public indexDbService: NgxIndexedDBService,
		@Inject('url') public url: String = '',
	) {
		this.indexDbService
			.getByKey('access_token', 1)
			.subscribe((access_token: any) => {
				if (access_token) {
					this.token = access_token.data
				}
			})
	}

	token: string | undefined | unknown = undefined

	headers() {
		this.indexDbService
			.getByKey('access_token', 1)
			.subscribe((access_token) => {
				if (access_token) {
					this.token = access_token
				}
			})

		let headers: any = {
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
			Authorization: 'Bearer ' + this.token,
		}

		if (!this.token) {
			delete headers['Authorization']
		}

		return {
			headers: new HttpHeaders(headers),
		}
	}

	paginate(url: string): Observable<T> {
		return this.http.get<T>(url, this.headers())
	}

	get(): Observable<T[]> {
		const url = `${environment.api}${this.url}`
		return this.http.get<any>(url, this.headers())
	}

	query(param: string): Observable<T> {
		const url = `${environment.api}${this.url}` + param
		return this.http.get<any>(url, this.headers())
	}

	findOne(id: string | number): Observable<T> {
		const url = `${environment.api}${this.url}/${id}`
		return this.http.get<T>(url, this.headers())
	}

	post(data: Object): Observable<T> {
		const url = `${environment.api}${this.url}`
		return this.http.post<T>(url, data, this.headers())
	}

	put(data: Object): Observable<T> {
		const url = `${environment.api}${this.url}`
		return this.http.put<T>(url, data, this.headers())
	}

	updateWithFile(id: string | number | false, data: Object): Observable<T> {
		const url = `${environment.api}${this.url}${
			id !== false ? `/${id}` : ''
		}`
		return this.http.post<T>(url, data, this.headers())
	}

	update(id: string | number | false, data: Object): Observable<T> {
		const url = `${environment.api}${this.url}${
			id !== false ? `/${id}` : ''
		}`
		return this.http.put<T>(url, data, this.headers())
	}

	remove(id: string | number): Observable<T> {
		const url = `${environment.api}${this.url}/${id}`
		return this.http.delete<T>(url, this.headers())
	}
}
