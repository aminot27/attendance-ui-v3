import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ParentService } from '../../../services/api/parent.service';
import { IParent } from '../../../models/parent.model';
import { StudentUpdateService } from 'src/app/services/student-update.service';
import { ParentUpdateService } from 'src/app/services/parent-update.service';

@Component({
  selector: 'app-parent-form',
  templateUrl: './parent-form.component.html',
  styleUrls: ['./parent-form.component.scss']
})
export class ParentFormComponent implements OnInit {
  parentForm: FormGroup;

  constructor(private fb: FormBuilder,
              private parentService: ParentService,
              private parentUpdateService: ParentUpdateService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.parentForm = this.fb.group({
      name: [''],
      last_name: [''],
      gender: [''],
      dni: [''],
      phone_number: ['']
    });
  } 

  onSubmit() {
    if (this.parentForm.valid) {  
      console.log('Sending POST with data:', JSON.stringify(this.parentForm.value));
      this.parentService.addParent(this.parentForm.value).subscribe({
        next: (parent) => {
          this.toastr.success('Parent added successfully');
          this.parentForm.reset();
          this.parentUpdateService.notifyParentAdded();
        },
        error: (error) => {
          this.toastr.error('Failed to add parent');
          console.error('Error adding parent:', error);
        }
      });
    } else {
      this.toastr.error('Please fill all required fields');
    }
  }
}