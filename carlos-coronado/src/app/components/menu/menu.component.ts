import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menus = [
    {text:'Motor de eventos', submenu: [
      {text:'Eventos', ruta:'/eventos'}, 
      {text:'Planes', ruta:'/planes'}, 
      {text:'Acciones', ruta:'/acciones'}
    ]},
    {text:'Campos pantalla', submenu: [
      {text:'Organismo sancionador'}, 
      {text:'Motivos'}
    ]},
    {text:'Perfiles usuarios', submenu: [
      {text:'Perfil usuario'}, 
      {text:'Perfil por zona'}, 
      {text:'Clientes excepcionados'}
    ]}
  ];
  menuSelected = {};
  showSubMenu = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  selectMenu(menu) {
    // console.log(evt.target.innerText);
    this.menuSelected = menu;
  }

  navigate(ruta) {
    this.router.navigate([ruta]);
  }
}
