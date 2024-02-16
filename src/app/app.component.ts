import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

import {IconSetService} from '@coreui/icons-angular';
import {iconSubset} from './icons/icon-subset';
import {Title} from '@angular/platform-browser';
import { GlobalKeyListenerService } from './services/global-key-listener.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  title = 'ASISTENCIA';

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    private globalKeyListenerService: GlobalKeyListenerService
  ) {
    titleService.setTitle(this.title);
    this.globalKeyListenerService.startListening();
    iconSetService.icons = {...iconSubset};
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
  }
}
