import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PagesService } from './../../pages.service';
import { InternalRoutes } from './../../../services/constants';

@Component({
  selector: 'pst-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  loginData;

  constructor(private router: Router, private pagesService: PagesService) { }

  ngOnInit() {
    this.pagesService.getDatosPago().subscribe(data => this.loginData = data);
  }

  login() {
    this.router.navigateByUrl(InternalRoutes.buscadorContratos);
  }

}
