import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShiftRoutingModule } from './shift-routing.module';
import { ShiftPageComponent } from './shift-page/shift-page.component';
import { FormsModule } from '@angular/forms';
import { GenericTableModule } from "../../containers/generic-table/generic-table.module";
import { GenericDeleteModule } from 'src/app/containers/generic-delete/generic-delete.module';
import { ShiftListComponent } from './shift-list/shift-list.component';
import { ShiftAddComponent } from './shift-add/shift-add.component';
import { ShiftEditComponent } from './shift-edit/shift-edit.component';
import { ShiftDeleteComponent } from './shift-delete/shift-delete.component';
import { GenericFormModule } from "../../containers/generic-form/generic-form.module";
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    declarations: [
        ShiftPageComponent,
        ShiftListComponent,
        ShiftAddComponent,
        ShiftEditComponent,
        ShiftDeleteComponent
    ],
    imports: [
        CommonModule,
        ShiftRoutingModule,
        FormsModule,
        GenericTableModule,
        GenericFormModule,
        MatDialogModule,
        GenericDeleteModule
    ]
})
export class ShiftModule { }
