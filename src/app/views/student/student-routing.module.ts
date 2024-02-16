import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentPageComponent } from '../student/student-page/student-page.component'
import { StudentFormComponent } from './student-form/student-form.component';

const routes: Routes = [
  {
    path: '',
    component: StudentPageComponent,
    data: {
      title: 'Student'
    }
  },
  {
    path: 'form', 
    component: StudentFormComponent,
    data: {
      title: 'Student Form'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
