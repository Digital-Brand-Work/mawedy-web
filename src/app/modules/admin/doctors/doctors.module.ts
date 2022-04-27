import { NgModule } from '@angular/core'
import { DoctorsComponent } from './doctors.component'
import { DoctorsTableComponent } from './doctors-table/doctors-table.component'
import { DoctorsToolbarComponent } from './doctors-toolbar/doctors-toolbar.component'
import { DoctorsFilterComponent } from './doctors-filter/doctors-filter.component'
import { DoctorAddComponent } from './modals/doctor-add/doctor-add.component'
import { WorkingScheduleComponent } from './modals/doctor-add/working-schedule/working-schedule.component'
import { DoctorDetailsComponent } from './modals/doctor-details/doctor-details.component'
import { DoctorDetailsWorkingScheduleComponent } from './modals/doctor-details/doctor-details-working-schedule/doctor-details-working-schedule.component'
import { DoctorEditComponent } from './modals/doctor-edit/doctor-edit.component'
import { DoctorAvailabilityComponent } from './modals/doctor-availability/doctor-availability.component'
import { DoctorConfirmDeleteComponent } from './modals/doctor-confirm-delete/doctor-confirm-delete.component'
import { SharedModule } from 'app/shared/shared.module'
import { ComponentsModule } from 'app/components/components.module'

const components = [
	DoctorsComponent,
	DoctorsTableComponent,
	DoctorsToolbarComponent,
	DoctorsFilterComponent,
	DoctorAddComponent,
	WorkingScheduleComponent,
	DoctorDetailsComponent,
	DoctorDetailsWorkingScheduleComponent,
	DoctorEditComponent,
	DoctorAvailabilityComponent,
	DoctorConfirmDeleteComponent,
]

@NgModule({
	declarations: [...components],
	imports: [SharedModule, ComponentsModule],
	exports: [...components],
})
export class DoctorsModule {}
