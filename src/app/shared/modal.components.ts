import { DoctorDetailsComponent } from './../modules/admin/doctors/modals/doctor-details/doctor-details.component'
import { AppointmentEditComponent } from './../modules/admin/appointments/appointment-edit/appointment-edit.component'
import { AppointmentAddComponent } from './../modules/admin/appointments/appointment-add/appointment-add.component'
import { ClinicServicesAddComponent } from 'app/modules/admin/clinic/clinic-services/modals/clinic-services-add/clinic-services-add.component'
import { ClinicServicesEditComponent } from 'app/modules/admin/clinic/clinic-services/modals/clinic-services-edit/clinic-services-edit.component'
import { ClinicDepartmentAddComponent } from 'app/modules/admin/clinic/clinic-services/modals/clinic-department-add/clinic-department-add.component'
import { DashboardAppointmentSelectDoctorComponent } from 'app/modules/admin/dashboard/appointments/modals/dashboard-appointment-select-doctor/dashboard-appointment-select-doctor.component'
import { DashboardAppointmentSelectTimeSlotComponent } from 'app/modules/admin/dashboard/appointments/modals/dashboard-appointment-select-time-slot/dashboard-appointment-select-time-slot.component'
import { DoctorAddComponent } from 'app/modules/admin/doctors/modals/doctor-add/doctor-add.component'
import { DoctorAvailabilityComponent } from 'app/modules/admin/doctors/modals/doctor-availability/doctor-availability.component'
import { DoctorConfirmDeleteComponent } from 'app/modules/admin/doctors/modals/doctor-confirm-delete/doctor-confirm-delete.component'
import { DoctorEditComponent } from 'app/modules/admin/doctors/modals/doctor-edit/doctor-edit.component'
import { PatientAddComponent } from 'app/modules/admin/patients/modals/patient-add/patient-add.component'
import { DashboardAppointmentAddComponent } from 'app/modules/admin/dashboard/appointments/modals/dashboard-appointment-add/dashboard-appointment-add.component'
import { DashboardAppointmentDetailsComponent } from 'app/modules/admin/dashboard/appointments/modals/dashboard-appointment-details/dashboard-appointment-details.component'
import { DashboardAppointmentConfirmCancelAppointmentComponent } from 'app/modules/admin/dashboard/appointments/modals/dashboard-appointment-confirm-cancel-appointment/dashboard-appointment-confirm-cancel-appointment.component'
import { DashboardAppointmentConfirmReassignSlotComponent } from 'app/modules/admin/dashboard/appointments/modals/dashboard-appointment-confirm-reassign-slot/dashboard-appointment-confirm-reassign-slot.component'
import { DashboardAppointmentAssignSlotComponent } from 'app/modules/admin/dashboard/appointments/modals/dashboard-appointment-assign-slot/dashboard-appointment-assign-slot.component'
import { SubscriptionInvoicesComponent } from 'app/modules/admin/subscriptions/modals/subscription-invoices/subscription-invoices.component'
import { DashboardAppointmentCancelAndAssignSlotComponent } from 'app/modules/admin/dashboard/appointments/modals/dashboard-appointment-cancel-and-assign-slot/dashboard-appointment-cancel-and-assign-slot.component'
import { ClinicTimingsSelectModalComponent } from 'app/modules/admin/clinic/clinic-timings/modals/clinic-timings-select-modal/clinic-timings-select-modal.component'
import { DoctorImportComponent } from 'app/modules/admin/doctors/modals/doctor-import/doctor-import.component'
import { PatientImportComponent } from 'app/modules/admin/patients/modals/patient-import/patient-import.component'

export const modalComponents: any[] = [
	AppointmentAddComponent,
	AppointmentEditComponent,

	DashboardAppointmentAddComponent,
	DashboardAppointmentDetailsComponent,
	DashboardAppointmentConfirmCancelAppointmentComponent,
	DashboardAppointmentConfirmReassignSlotComponent,
	DashboardAppointmentAssignSlotComponent,
	DashboardAppointmentSelectDoctorComponent,
	DashboardAppointmentSelectTimeSlotComponent,
	DashboardAppointmentCancelAndAssignSlotComponent,

	DoctorAddComponent,
	DoctorAvailabilityComponent,
	DoctorConfirmDeleteComponent,
	DoctorDetailsComponent,
	DoctorEditComponent,
	DoctorImportComponent,

	PatientAddComponent,
	PatientImportComponent,

	ClinicServicesAddComponent,
	ClinicDepartmentAddComponent,
	ClinicServicesEditComponent,
	ClinicTimingsSelectModalComponent,

	SubscriptionInvoicesComponent,
]
