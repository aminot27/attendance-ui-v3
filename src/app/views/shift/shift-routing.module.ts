import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShiftPageComponent } from './shift-page/shift-page.component';

const routes: Routes = [
  {
    path: '',
    component: ShiftPageComponent,
    data: {
      title: 'shift'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShiftRoutingModule { }
