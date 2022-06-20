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

export interface PHPFile extends PHPBaseModel {
	url: string
	type: string
	name: string
	size: string
}

export type Time = `${string}:${string}`

export type BreakPoint = 'phone' | 'tablet' | 'laptop' | 'desktop' | 'max'
