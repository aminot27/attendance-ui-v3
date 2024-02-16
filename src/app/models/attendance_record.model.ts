export interface IAttendanceRecord {
    attendance_id?: number;
    student?: number; 
    studentName: string;
    entry_time: string;
    exit_time: string;
    status: 'Present' | 'Absent' | 'Late' | 'Excused'; 
    shift: number; 
}