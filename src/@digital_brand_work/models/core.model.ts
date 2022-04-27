export interface PHPBaseModel {
	id?: string
	created_at?: string
	updated_at?: string
}

export interface NodeBaseModel {
	id?: string
	createdAt?: string
	updatedAt?: string
}

export type BreakPoint = 'phone' | 'tablet' | 'laptop' | 'desktop' | 'max'
