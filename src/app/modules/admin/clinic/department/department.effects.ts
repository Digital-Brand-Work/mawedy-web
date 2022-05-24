import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, concatMap, map, mergeMap } from 'rxjs'
import { EMPTY } from 'rxjs'
import { DepartmentService } from './department.service'
import * as DepartmentActions from './department.actions'

@Injectable()
export class DepartmentEffects {
	constructor(
		private actions$: Actions,
		private service: DepartmentService,
	) {}

	get$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(DepartmentActions.loadDepartments),
				mergeMap(() =>
					this.service.get().pipe(
						map((data) => ({
							type: DepartmentActions.loadDepartments,
							payload: data,
						})),
						catchError(() => EMPTY),
					),
				),
			) as any,
	)

	add$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(DepartmentActions.addDepartment),
				concatMap(({ department }) =>
					this.service.post(department).pipe(
						map((data) => ({
							type: DepartmentActions.addDepartment,
							payload: data,
						})),
						catchError(() => EMPTY),
					),
				),
			) as any,
	)

	update$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(DepartmentActions.updateDepartment),
				concatMap(({ department }) =>
					this.service.updateWithFile(department.id, department).pipe(
						map((data) => ({
							type: DepartmentActions.updateDepartment,
							payload: data,
						})),
						catchError(() => EMPTY),
					),
				),
			) as any,
	)

	remove$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(DepartmentActions.deleteDepartment),
				concatMap(({ id }) =>
					this.service.remove(id).pipe(
						map(() => ({
							type: DepartmentActions.deleteDepartment,
							payload: id,
						})),
						catchError(() => EMPTY),
					),
				),
			) as any,
	)
}
