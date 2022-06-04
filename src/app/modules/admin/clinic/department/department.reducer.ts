import { createReducer, on } from '@ngrx/store'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { Department } from './department.model'
import * as DepartmentActions from './department.actions'

export const departmentsFeatureKey = 'department'

export interface State extends EntityState<Department> {
	// additional entities state properties
}

export const adapter: EntityAdapter<Department> = createEntityAdapter<Department>()

export const initialState: State = adapter.getInitialState({
	// additional entity state properties
})

export const reducer = createReducer(
	initialState,

	on(DepartmentActions.loadDepartments, (state, action) => adapter.setAll(action.departments, state)),

	on(DepartmentActions.addDepartment, (state, action) => adapter.addOne(action.department, state)),

	on(DepartmentActions.updateDepartment, (state, action) => adapter.updateOne(action.department, state)),

	on(DepartmentActions.deleteDepartment, (state, action) => adapter.removeOne(action.id, state)),
)

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors()
