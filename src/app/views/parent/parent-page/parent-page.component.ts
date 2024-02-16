// parent-page.component.ts
import { Component, OnInit } from '@angular/core';
import { ParentService } from 'src/app/services/api/parent.service';
import { IParent } from 'src/app/models/parent.model';

@Component({
  selector: 'app-parent-page',
  templateUrl: './parent-page.component.html',
  styleUrls: ['./parent-page.component.scss']
})
export class ParentPageComponent implements OnInit {
  parents: IParent[] = [];

  constructor(private parentService: ParentService) { }

  ngOnInit(): void {
    this.loadParents();
  }

  loadParents(): void {
    this.parentService.getParents().subscribe({
      next: (parents) => {
        this.parents = parents;
      },
      error: (error) => {
        console.error('Error al cargar los parents', error);
      }
    });
  }
  
}