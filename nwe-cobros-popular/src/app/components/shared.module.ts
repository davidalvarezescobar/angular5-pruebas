import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Prime NG
import { ButtonModule, DialogModule, OverlayPanelModule } from 'primeng/primeng';

// Components
import { HeaderTitleComponent } from './header-title/header-title.component';
import { DropdownOptionComponent } from './dropdown-option/dropdown-option.component';
import { InfoBoxComponent } from './info-box/info-box.component';

@NgModule({
  imports: [
    CommonModule,
    OverlayPanelModule
  ],
  declarations: [
    HeaderTitleComponent,
    DropdownOptionComponent,
    InfoBoxComponent
  ],
  exports: [
    HeaderTitleComponent,
    DropdownOptionComponent,
    InfoBoxComponent
  ]
})
export class SharedModule { }
