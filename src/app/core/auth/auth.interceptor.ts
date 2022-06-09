import { Injectable } from '@angular/core'
import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http'
import { catchError, Observable, throwError } from 'rxjs'
import { AuthService } from 'app/core/auth/auth.service'
import { AuthUtils } from 'app/core/auth/auth.utils'
import { ClinicUserService } from 'app/modules/admin/clinic/clinic.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	/**
	 * Constructor
	 */
	constructor(
		private _authService: AuthService,
		private _clinicUserService: ClinicUserService,
	) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler,
	): Observable<HttpEvent<any>> {
		let newReq = req.clone()

		if (
			this._authService.accessToken &&
			!AuthUtils.isTokenExpired(this._authService.accessToken)
		) {
			newReq = req.clone({
				headers: req.headers.set(
					'Authorization',
					'Bearer ' + this._authService.accessToken,
				),
			})
		}

		return next.handle(newReq).pipe(
			catchError((error) => {
				if (
					error instanceof HttpErrorResponse &&
					error.status === 401
				) {
					this._clinicUserService.logout()
				}

				return throwError(error)
			}),
		)
	}
}
