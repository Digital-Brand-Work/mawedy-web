import { AppToolbarComponent } from './../components/app-toolbar/app-toolbar.component'
import { SpinnerComponent } from 'app/components/spinner/spinner.component'
import { MobileNumberFormComponent } from 'app/components/forms/mobile-number-form/mobile-number-form.component'
import { AlertComponent } from 'app/components/alert/alert.component'
import { ModalHeaderComponent } from 'app/components/modal-header/modal-header.component'
import { ClinicTimingInputComponent } from 'app/components/clinic-timing-input/clinic-timing-input.component'
import { CountryFormComponent } from 'app/components/forms/country-form/country-form.component'
import { DoctorDetailsWorkingScheduleComponent } from 'app/modules/admin/doctors/modals/doctor-details/doctor-details-working-schedule/doctor-details-working-schedule.component'
import { WorkingScheduleComponent } from 'app/modules/admin/doctors/modals/doctor-add/working-schedule/working-schedule.component'
import { AppStoreButtonComponent } from 'app/components/buttons/app-store-button/app-store-button.component'
import { GooglePlayButtonComponent } from 'app/components/buttons/google-play-button/google-play-button.component'
import { GooglePayButtonComponent } from 'app/components/buttons/google-pay-button/google-pay-button.component'
import { ApplePayButtonComponent } from 'app/components/buttons/apple-pay-button/apple-pay-button.component'
import { CardNumberFormComponent } from 'app/components/forms/card-number-form/card-number-form.component'
import { AvatarPlaceholderComponent } from 'app/components/avatar-placeholder/avatar-placeholder.component'
import { BannerPlaceholderComponent } from 'app/components/banner-placeholder/banner-placeholder.component'
import { DoctorScheduleSelectComponent } from 'app/components/forms/doctor-schedule-select/doctor-schedule-select.component'
import { ClinicScheduleSelectComponent } from 'app/components/forms/clinic-schedule-select/clinic-schedule-select.component'
import { DoctorImagePlaceholderComponent } from 'app/components/placeholders/doctor-image-placeholder/doctor-image-placeholder.component'

export const appComponents = [
	GooglePlayButtonComponent,
	AppStoreButtonComponent,
	GooglePayButtonComponent,
	ApplePayButtonComponent,
	CardNumberFormComponent,
	SpinnerComponent,
	MobileNumberFormComponent,
	AppToolbarComponent,
	AlertComponent,
	ModalHeaderComponent,
	ClinicTimingInputComponent,
	CountryFormComponent,
	DoctorDetailsWorkingScheduleComponent,
	WorkingScheduleComponent,
	AvatarPlaceholderComponent,
	BannerPlaceholderComponent,
	DoctorScheduleSelectComponent,
	ClinicScheduleSelectComponent,
	DoctorImagePlaceholderComponent,
]
