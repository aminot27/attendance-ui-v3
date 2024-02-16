import { Component, OnInit } from '@angular/core';
import { GlobalKeyListenerService } from 'src/app/services/global-key-listener.service';
import { AttendanceService } from 'src/app/services/api/attendance.service';
import { IAttendanceRecord } from 'src/app/models/attendance_record.model';


@Component({
  selector: 'app-attendance-scanner',
  templateUrl: './attendance-scanner.component.html',
  styleUrls: ['./attendance-scanner.component.scss']
})
export class AttendanceScannerComponent {
}
