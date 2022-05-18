import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnerWithUsComponent } from './partner-with-us.component';
import { PartnerWithUsSection1Component } from './partner-with-us-section1/partner-with-us-section1.component';
import { PartnerWithUsSection2Component } from './partner-with-us-section2/partner-with-us-section2.component';
import { PartnerWithUsSection3Component } from './partner-with-us-section3/partner-with-us-section3.component';



@NgModule({
  declarations: [
    PartnerWithUsComponent,
    PartnerWithUsSection1Component,
    PartnerWithUsSection2Component,
    PartnerWithUsSection3Component
  ],
  imports: [
    CommonModule
  ]
})
export class PartnerWithUsModule { }
