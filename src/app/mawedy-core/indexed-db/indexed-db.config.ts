import { DBConfig } from 'ngx-indexed-db'

export function migrationFactory() {
	return {}
}

export const indexedDbConfig: DBConfig = {
	name: 'mawedy',
	version: 2,
	objectStoresMeta: [
		{
			store: 'subscription_request',
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
			store: 'account_users_request',
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
	],
	migrationFactory,
}

// delete kag v3
