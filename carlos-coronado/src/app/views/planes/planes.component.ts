import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {
  planes$;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.planes$ = this.appService.getListadoPlanes();
  }

}
