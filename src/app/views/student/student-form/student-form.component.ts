import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../../../services/api/student.service';
import { ParentService } from '../../../services/api/parent.service';
import { ShiftService } from '../../../services/api/shift.service';
import { StudentUpdateService } from '../../../services/student-update.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;
  parents: any[] = [];
  shifts: any[] = [];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private parentService: ParentService,
    private shiftService: ShiftService,
    private toastr: ToastrService,
    private studentUpdateService: StudentUpdateService
  ) { }

  ngOnInit() {
    this.studentForm = this.fb.group({
      name: [''],
      last_name: [''],
      gender: ['', Validators.required],
      dni: [''],
      phone_number: [''],
      parent: [null], // Asegúrate de que este campo se actualice correctamente
      shift: [null], // Asegúrate de que este campo se actualice correctamente
    });

    this.loadParents();
    this.loadShifts();
  }

  loadParents() {
    this.parentService.getParents().subscribe(parents => {
      this.parents = parents.map(parent => ({
        ...parent,
        id: Number(parent.parent_id) // Asegúrate de que los IDs sean números
      }));
    });
  }

  loadShifts() {
    this.shiftService.getShifts().subscribe(shifts => {
      this.shifts = shifts.map(shift => ({
        ...shift,
        id: Number(shift.shift_id) // Asegúrate de que los IDs sean números
      }));
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const formData = {
        ...this.studentForm.value,
        parent: Number(this.studentForm.value.parent), // Convierte a número
        shift: Number(this.studentForm.value.shift) // Convierte a número
      };

      console.log('Sending POST with data:', JSON.stringify(formData));
      this.studentService.addStudent(formData).subscribe({
        next: (student) => {
          this.toastr.success('Student added successfully');
          this.studentForm.reset();
          this.studentUpdateService.notifyStudentAdded(); 
        },
        error: (error) => {
          this.toastr.error('Failed to add student');
          console.error('Error adding student:', error);
        }
      });
    } else {
      this.toastr.error('Please fill all required fields');
    }
  }
}