import { DBConfig } from 'ngx-indexed-db'
import { DB } from '../enums/index.db.enum'

export function migrationFactory() {
	return {}
}

export const indexedDbConfig: DBConfig = {
	name: 'mawedy',
	version: 5,
	objectStoresMeta: [
		{
			store: DB.SUBSCRIPTION_REQUEST,
			storeConfig: { keyPath: 'id', autoIncrement: true },
			storeSchema: [
				{
					name: 'interval',
					keypath: 'interval',
					options: { unique: false },
				},
				{
					name: 'subscription',
					keypath: 'subscription',
					options: { unique: false },
				},
			],
		},
		{
			store: DB.ACCOUNT_USERS_REQUEST,
			storeConfig: { keyPath: 'id', autoIncrement: true },
			storeSchema: [
				{
					name: 'subscription_request_id',
					keypath: 'subscription_request_id',
					options: { unique: false },
				},
				{ name: 'users', keypath: 'users', options: { unique: false } },
			],
		},
		{
			store: DB.CLINIC,
			storeConfig: { keyPath: 'id', autoIncrement: true },
			storeSchema: [
				{ name: 'data', keypath: 'data', options: { unique: false } },
			],
		},
		{
			store: DB.APPOINTMENTS,
			storeConfig: { keyPath: 'id', autoIncrement: true },
			storeSchema: [
				{ name: 'data', keypath: 'data', options: { unique: false } },
			],
		},
		{
			store: DB.DOCTORS,
			storeConfig: { keyPath: 'id', autoIncrement: true },
			storeSchema: [
				{ name: 'data', keypath: 'data', options: { unique: false } },
			],
		},
		{
			store: DB.PROMOTIONS,
			storeConfig: { keyPath: 'id', autoIncrement: true },
			storeSchema: [
				{ name: 'data', keypath: 'data', options: { unique: false } },
			],
		},
		{
			store: DB.SUBSCRIPTIONS,
			storeConfig: { keyPath: 'id', autoIncrement: true },
			storeSchema: [
				{ name: 'data', keypath: 'data', options: { unique: false } },
			],
		},
	],
}

// delete kag v3
