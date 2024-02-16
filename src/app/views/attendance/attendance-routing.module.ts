import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendancePageComponent } from './attendance-page/attendance-page.component';
import { AttendanceTableComponent } from './attendance-table/attendance-table.component';

const routes: Routes = [
  {
    path: '',
    component: AttendancePageComponent,
    data: {
      title: 'attendance'
    }
  },
  {
    path: 'table',
    component: AttendanceTableComponent,
    data: {
      title: 'attendance tablee'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
