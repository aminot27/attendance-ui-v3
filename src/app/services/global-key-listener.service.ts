import { Injectable } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { filter, buffer, debounceTime } from 'rxjs/operators';
import { ScanService } from '../services/api/scan.service'; // Asegúrate de importar ScanService correctamente
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GlobalKeyListenerService {
  private dniScannedSource = new Subject<string>(); 
  dniScanned$ = this.dniScannedSource.asObservable();
  public dniRegistrationSuccess = new Subject<void>();
  constructor(private scanService: ScanService, private toastr: ToastrService) { } // Inyecta ScanService

  startListening() {
    fromEvent(document, 'keydown')
      .pipe(
        buffer(fromEvent(document, 'keydown').pipe(debounceTime(250))),
        filter((keyEvents: KeyboardEvent[]) => this.isDniSequence(keyEvents))
      )
      .subscribe((keyEvents) => {
        const dni = this.extractDniFromSequence(keyEvents);
        if (dni) {
          this.registerDni(dni);
        }
      });
  }

  private isDniSequence(keyEvents: KeyboardEvent[]): boolean {
    return keyEvents.length > 0 && keyEvents[keyEvents.length - 1].key === 'Enter';
  }

  private extractDniFromSequence(keyEvents: KeyboardEvent[]): string {
    const keyValues = keyEvents.map(event => event.key);
    let dni = keyValues.slice(0, -1).join('');
    return dni;
  }

  private registerDni(dni: string) {
    this.dniScannedSource.next(dni);
    this.scanService.sendDni(dni).subscribe({
      next: (response) =>{
        this.toastr.success('Registro de asistencia actualizado');
        this.dniRegistrationSuccess.next();
      },
      error: (error) => {
        this.toastr.error('Error, Estudiante fuera de turno!');
        }
    });
  }
}