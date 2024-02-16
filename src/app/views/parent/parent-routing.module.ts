import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentPageComponent } from '../parent/parent-page/parent-page.component'
import { ParentFormComponent } from '../parent/parent-form/parent-form.component'

const routes: Routes = [
  {
    path: '',
    component: ParentPageComponent,
    data: {
      title: 'parent'
    }
  },
  {
    path: 'form', 
    component: ParentFormComponent,
    data: {
      title: 'Parent Form'
    }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentRoutingModule { }
