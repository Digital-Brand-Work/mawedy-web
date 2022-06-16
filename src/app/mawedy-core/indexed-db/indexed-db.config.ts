import { DBConfig } from 'ngx-indexed-db'
import { DB } from '../enums/index.db.enum'

export function migrationFactory() {
	return {}
}

export const indexedDbConfig: DBConfig = {
	name: 'mawedy',
	version: 13,
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
			store: DB.DASHBOARD_APPOINTMENTS,
			storeConfig: { keyPath: 'id', autoIncrement: true },
			storeSchema: [],
		},
		{
			store: DB.DASHBOARD_WAITING_PATIENTS,
			storeConfig: { keyPath: 'id', autoIncrement: true },
			storeSchema: [],
		},
		{
			store: DB.DASHBOARD_FOR_APPROVAL_PATIENTS,
			storeConfig: { keyPath: 'id', autoIncrement: true },
			storeSchema: [],
		},

		{
			store: DB.APPOINTMENTS,
			storeConfig: { keyPath: 'id', autoIncrement: true },
			storeSchema: [],
		},
		{
			store: DB.APPOINTMENT,
			storeConfig: { keyPath: 'id', autoIncrement: true },
			storeSchema: [],
		},

		{
			store: DB.DOCTORS,
			storeConfig: { keyPath: 'id', autoIncrement: true },
			storeSchema: [],
		},
		{
			store: DB.DOCTOR,
			storeConfig: { keyPath: 'id', autoIncrement: true },
			storeSchema: [],
		},

		{
			store: DB.PATIENTS,
			storeConfig: { keyPath: 'id', autoIncrement: true },
			storeSchema: [],
		},
		{
			store: DB.PATIENT,
			storeConfig: { keyPath: 'id', autoIncrement: true },
			storeSchema: [],
		},

		{
			store: DB.DEPARTMENTS,
			storeConfig: { keyPath: 'id', autoIncrement: true },
			storeSchema: [],
		},
		{
			store: DB.DEPARTMENT,
			storeConfig: { keyPath: 'id', autoIncrement: true },
			storeSchema: [],
		},

		{
			store: DB.MEDICAL_SERVICES,
			storeConfig: { keyPath: 'id', autoIncrement: true },
			storeSchema: [],
		},
		{
			store: DB.MEDICAL_SERVICE,
			storeConfig: { keyPath: 'id', autoIncrement: true },
			storeSchema: [],
		},

		{
			store: DB.PROMOTIONS,
			storeConfig: { keyPath: 'id', autoIncrement: true },
			storeSchema: [],
		},
		{
			store: DB.PROMOTION,
			storeConfig: { keyPath: 'id', autoIncrement: true },
			storeSchema: [],
		},

		{
			store: DB.SUBSCRIPTIONS,
			storeConfig: { keyPath: 'id', autoIncrement: true },
			storeSchema: [
				{ name: 'data', keypath: 'data', options: { unique: false } },
			],
		},
		{
			store: DB.ACCESS_TOKEN,
			storeConfig: { keyPath: 'id', autoIncrement: true },
			storeSchema: [
				{ name: 'data', keypath: 'data', options: { unique: false } },
			],
		},
	],
}

// delete kag v3
