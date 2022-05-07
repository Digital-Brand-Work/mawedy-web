export interface Alert {
	id: string
	title: string
	message: string
	type: 'success' | 'info' | 'error'
}

export interface SubscriptionFeatures {
	standard: string[]
	golden: string[]
	platinum: string[]
}
