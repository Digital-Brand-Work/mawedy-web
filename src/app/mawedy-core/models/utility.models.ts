export interface Alert {
	id: string
	title: string
	message: string
	type: 'success' | 'info' | 'error'
}
