import { Pipe, PipeTransform } from '@angular/core'
import { Clinic } from 'app/modules/admin/clinic/clinic.model'
import { Subscription } from '../models/utility.models'

@Pipe({ name: 'resolve_subscription' })
export class ResolveSubscriptionPipe implements PipeTransform {
	transform(clinic: Clinic, subscription: Subscription): boolean {
		return resolve_subscription(clinic, subscription)
	}
}

export function resolve_subscription(
	clinic: Clinic,
	subscription: Subscription,
): boolean {
	const FREE = clinic.subscription_type === 'Free'

	const GOLDEN_TO_PLATINUM =
		clinic.subscription_type === 'Golden' &&
		subscription.type === 'Platinum'

	const STANDARD_TO_GOLDEN =
		clinic.subscription_type === 'Standard' &&
		subscription.type === 'Golden'

	const STANDARD_TO_PLATINUM =
		clinic.subscription_type === 'Standard' &&
		subscription.type === 'Platinum'

	if (
		GOLDEN_TO_PLATINUM ||
		STANDARD_TO_GOLDEN ||
		STANDARD_TO_PLATINUM ||
		FREE
	) {
		return true
	}

	return false
}
