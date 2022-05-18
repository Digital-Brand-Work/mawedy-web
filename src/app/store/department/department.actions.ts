import { createAction, props } from '@ngrx/store'
import { Update } from '@ngrx/entity'
import { Department } from './department.model'

export const loadDepartments = createAction(
	'[Department/API] Load Departments',
	props<{ departments: Department[] }>(),
)

export const addDepartment = createAction(
	'[Department/API] Add Department',
	props<{ department: Department }>(),
)

export const updateDepartment = createAction(
	'[Department/API] Update Department',
	props<{ department: Update<Department> }>(),
)

export const deleteDepartment = createAction(
	'[Department/API] Delete Department',
	props<{ id: string }>(),
)
