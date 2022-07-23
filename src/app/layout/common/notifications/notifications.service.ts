import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, Observable, ReplaySubject, switchMap, take, tap } from 'rxjs'
import { Notification } from 'app/layout/common/notifications/notifications.types'

@Injectable({
	providedIn: 'root',
})
export class NotificationsService {
	private _notifications: ReplaySubject<Notification[]> = new ReplaySubject<
		Notification[]
	>(1)

	constructor(private _httpClient: HttpClient) {}

	get notifications$(): Observable<Notification[]> {
		return this._notifications.asObservable()
	}

	getAll(): Observable<Notification[]> {
		return this._httpClient
			.get<Notification[]>('api/common/notifications')
			.pipe(
				tap((notifications) => {
					this._notifications.next(notifications)
				}),
			)
	}

	create(notification: Notification): Observable<Notification> {
		return this.notifications$.pipe(
			take(1),
			switchMap((notifications) =>
				this._httpClient
					.post<Notification>('api/common/notifications', {
						notification,
					})
					.pipe(
						map((newNotification) => {
							this._notifications.next([
								...notifications,
								newNotification,
							])

							return newNotification
						}),
					),
			),
		)
	}

	update(id: string, notification: Notification): Observable<Notification> {
		return this.notifications$.pipe(
			take(1),
			switchMap((notifications) =>
				this._httpClient
					.patch<Notification>('api/common/notifications', {
						id,
						notification,
					})
					.pipe(
						map((updatedNotification: Notification) => {
							const index = notifications.findIndex(
								(item) => item.id === id,
							)

							// Update the notification
							notifications[index] = updatedNotification

							this._notifications.next(notifications)

							return updatedNotification
						}),
					),
			),
		)
	}

	delete(id: string): Observable<boolean> {
		return this.notifications$.pipe(
			take(1),
			switchMap((notifications) =>
				this._httpClient
					.delete<boolean>('api/common/notifications', {
						params: { id },
					})
					.pipe(
						map((isDeleted: boolean) => {
							const index = notifications.findIndex(
								(item) => item.id === id,
							)

							notifications.splice(index, 1)

							this._notifications.next(notifications)

							return isDeleted
						}),
					),
			),
		)
	}

	markAllAsRead(): Observable<boolean> {
		return this.notifications$.pipe(
			take(1),
			switchMap((notifications) =>
				this._httpClient
					.get<boolean>('api/common/notifications/mark-all-as-read')
					.pipe(
						map((isUpdated: boolean) => {
							this._notifications.next(notifications)

							return isUpdated
						}),
					),
			),
		)
	}
}
