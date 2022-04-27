import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicComponent } from './clinic.component';
import { ClinicInformationComponent } from './clinic-information/clinic-information.component';
import { ClinicServicesComponent } from './clinic-services/clinic-services.component';
import { ClinicDepartmentAddComponent } from './clinic-services/modals/clinic-department-add/clinic-department-add.component';
import { ClinicServicesAddComponent } from './clinic-services/modals/clinic-services-add/clinic-services-add.component';
import { ClinicServicesEditComponent } from './clinic-services/modals/clinic-services-edit/clinic-services-edit.component';
import { ClinicInformationMapComponent } from './clinic-information-map/clinic-information-map.component';



@NgModule({
  declarations: [
    ClinicComponent,
    ClinicInformationComponent,
    ClinicServicesComponent,
    ClinicDepartmentAddComponent,
    ClinicServicesAddComponent,
    ClinicServicesEditComponent,
    ClinicInformationMapComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ClinicModule { }
