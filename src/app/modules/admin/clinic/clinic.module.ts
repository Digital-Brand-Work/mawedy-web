import { SharedModule } from './../../../shared/shared.module'
import { NgModule } from '@angular/core'
import { ClinicComponent } from './clinic.component'
import { ClinicInformationComponent } from './clinic-information/clinic-information.component'
import { ClinicServicesComponent } from './clinic-services/clinic-services.component'
import { ClinicDepartmentAddComponent } from './clinic-services/modals/clinic-department-add/clinic-department-add.component'
import { ClinicServicesAddComponent } from './clinic-services/modals/clinic-services-add/clinic-services-add.component'
import { ClinicServicesEditComponent } from './clinic-services/modals/clinic-services-edit/clinic-services-edit.component'
import { ClinicInformationMapComponent } from './clinic-information-map/clinic-information-map.component'

const components = [
	ClinicComponent,
	ClinicInformationComponent,
	ClinicServicesComponent,
	ClinicDepartmentAddComponent,
	ClinicServicesAddComponent,
	ClinicServicesEditComponent,
	ClinicInformationMapComponent,
]

@NgModule({
	declarations: [...components],
	imports: [SharedModule],
	exports: [...components],
})
export class ClinicModule {}
