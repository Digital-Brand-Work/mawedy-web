import { createAction, props } from '@ngrx/store'

enum AppSubscriptionActionEnum {
	LOAD = '[AppSubscription/System] Load AppSubscriptions',
	LOAD_SUCCESS = '[AppSubscription/API] Load AppSubscriptions Success',
}

export const LOAD = createAction(AppSubscriptionActionEnum.LOAD)

export const LOAD_SUCCESS = createAction(
	AppSubscriptionActionEnum.LOAD,
	props<{ subscription: any }>(),
)
