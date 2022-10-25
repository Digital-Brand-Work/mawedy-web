import { FuseAlertType } from '@fuse/components/alert'
import { PaginationLink } from 'app/app.resolvers'

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

export interface GoogleMapStyle {
	featureType: string
	elementType: string
	stylers: { [key: string]: string | number }[]
}
export interface LaravelResponse<T> {
	data: { data: T }
}

export interface PHPResponse<T> {
	data: T
	links: {
		first: string
		last: string
		next: string | number | null
		prev: string | number | null
	}
	meta: {
		current_page: number
		from: number
		last_page: number
		path: number
		per_page: number
		to: number
		total: number
		links: PaginationLink[]
	}
}

export interface Coordinates {
	latitude: number
	longitude: number
}

export interface Entity<T> {
	entities: [string: T]
	ids: string[]
}

export interface FuseAlert {
	type: FuseAlertType
	message: string
}
export interface NodeResponse<T> {
	data: T
	meta: NodePaginationMeta
}
export interface NodePaginationMeta {
	total: number
	per_page: number
	current_page: number
	last_page: number
	first_page: number
	first_page_url: string
	last_page_url: string
	next_page_url: null
	previous_page_url: null
}

export type NodeFile =
	| File
	| {
			url: string
	  }
