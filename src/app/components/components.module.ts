import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core';
import { DoctorImagePlaceholderComponent } from './placeholders/doctor-image-placeholder/doctor-image-placeholder.component'

const components = []

@NgModule({
	declarations: [
    DoctorImagePlaceholderComponent
  ],
	imports: [CommonModule],
	exports: [],
})
export class ComponentsModule {}
