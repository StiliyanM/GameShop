import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './directives/dropdown.directive';
import { CollapseDirective } from './directives/collapse.directive';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { BaseComponent } from './base.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ConfirmationDialogComponent,
    CollapseDirective,
    DropdownDirective,
  ],
  declarations: [
    CollapseDirective,
    DropdownDirective,
    ConfirmationDialogComponent,
    BaseComponent
  ],
  entryComponents: [ConfirmationDialogComponent]
})
export class SharedModule { }
