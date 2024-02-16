import {Component, OnInit} from '@angular/core';

import {navItems} from './_nav';
import {IconSetService} from "@coreui/icons-angular";
import {cilDrop, cilSpeedometer} from "@coreui/icons";
import {AuthenticationService} from "../../services/security/authentication.service";
import {ModuleModel} from "../../models/security-models/module.model";
import {UserRolModel} from "../../models/security-models/user-rol.model";
import {iconSubset} from "../../icons/icon-subset";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {

  public navItems = [];
  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };
  currentRol: UserRolModel;

  constructor(public iconSet: IconSetService, private _authService: AuthenticationService, private _router: Router) {
    iconSet.icons = {...iconSubset};
  }

  ngOnInit(): void {
    let roles = this._authService.userRoleValues;
    if (!roles || roles.length === 0) {
      const storedRoles = localStorage.getItem('roles');
      roles = storedRoles ? JSON.parse(storedRoles) : [];
    }
    
    if (roles.length > 0) {
      this.currentRol = roles[0];
      this.setNavigationItems(this.currentRol);
    } else {
      console.error('No se encontraron roles para el usuario');
    }
  }

  setNavigationItems(selectedRol: UserRolModel): void {
    this.navItems = [
      {
        name: 'MENU',
        url: '/dashboard',
        iconComponent: {name: 'cil-speedometer'},
        badge: {
          color: 'info',
          text: 'NEW'
        },
      },
      {
        title: true,
        name: 'Gestión Académica'
      },
    
    ]
    const modules = selectedRol.modules;
    modules.forEach(module => {
      const item = {
        name: module.module,
        url: module.url ? module.url : '/default-url',
        iconComponent: {name: module.icon},
        children: module.views.map(view => {
          return {
            name: view.view,
            url: view.path
          }
        })
      }
      this.navItems.push(item)
    })
  }
}