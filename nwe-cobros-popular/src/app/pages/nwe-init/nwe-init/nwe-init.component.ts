import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'ng2-translate';
import { SelectItem } from 'primeng/primeng';
import { selector } from 'rxjs/operator/publish';

import { CommonConstants } from '../../../config/constants';
import { StorageService } from '../../../services/storage/storage.service';
import { CustomLanguageLoader } from '../../../services/translations/language.loader';
import { UserService } from '../../../services/user/user.service';
import { Environment } from '../../../config/setup/config';
import { SetupService } from '../../../config/setup/setup.service';

@Component({
  selector: 'app-nwe-init',
  templateUrl: './nwe-init.component.html',
  styleUrls: ['./nwe-init.component.less']
})

export class NweInitComponent implements OnInit {

  selectedUser;
  selectedPagina;
  selectedIdioma;
  usuarios:SelectItem[];
  pagina:SelectItem[];
  idioma:SelectItem[];

  constructor(
    private storageService:StorageService,
    private nav: Router,
    private translate: TranslateService,
    private setupService: SetupService,
    private userService: UserService,
    private customLanguageLoader:CustomLanguageLoader
  ) {
    this.usuarios=[
    {label:'EMPAGOSTO17', value:'EMPAGOSTO17'},
    {label:'FICOTACTICO3', value:'FICOTACTICO3'},
    {label:'ROTA25B', value:'ROTA25B'},
    {label:'LUCITRES', value:'LUCITRES'},
    {label:'FELIPE', value:'FELIPE'},
    {label:'CRIPTOPE1', value:'CRIPTOPE1'},
    {label:'DOMINGUIÑ12', value:'DOMINGUIÑ12'},
    {label:'USUARIO201', value:'USUARIO201'},
    {label:'EUROEXPOR', value:'EUROEXPOR'},
    {label:'GARGARAN18', value:'GARGARAN18'},
    {label:'PERECRIPT', value:'PERECRIPT'},
    {label:'PARRA2244', value:'PARRA2244'},
    {label:'Z78872914', value:'Z78872914'},
    {label:'AUTOMATIC', value:'AUTOMATIC'},
    {label:'PRECON1', value:'PRECON1'},
    {label:'PRECON101', value:'PRECON101'},
    {label:'PRECON102', value:'PRECON102'},
    {label:'PRECON103', value:'PRECON103'},
    {label:'PRECON2', value:'PRECON2'},
    {label:'PRECON201', value:'PRECON201'},
    {label:'PRECON202', value:'PRECON202'},
    {label:'PRECON203', value:'PRECON203'}]

    this.pagina=[
      {label:'Alta de cobros', value:'alta-de-cobros'},
      {label:'Consulta de cobros', value:'alta-de-cobros/buscador-contratos'}
    ];

    this.idioma=[
      {value:'es_ES',label:'Castellano'},
      {value:'en_GB',label:'Inglés'},
      {value:'ca_ES',label:'Catalán'},
      {value:'eu_ES',label:'Euskera'},
      {value:'de_DE',label:'Alemán'}];
  }
  ngOnInit() {
    this.selectedUser = this.usuarios[0].value;
    this.selectedPagina = this.pagina[0].value;
    this.selectedIdioma = this.idioma[0].value;
  }
  navegar() {
    Environment.config.xAlias=this.selectedUser;
    this.userService.getMe(Environment.config.apiRestDomain + Environment.config.nweCmcContractApi).subscribe(data=> {
      this.storageService.setSessionItem('nwe_init',{xAlias:this.selectedUser,route:this.selectedPagina,language:this.selectedIdioma});
      this.storageService.setSessionItem(CommonConstants.KEY_USER,data.body);
      sessionStorage.setItem(CommonConstants.KEY_LANGUAGE, this.selectedIdioma);
      this.nav.navigateByUrl(this.selectedPagina);
    });
  }
  cambiaIdioma() {
    sessionStorage.setItem(CommonConstants.KEY_LANGUAGE, this.selectedIdioma);
    this.customLanguageLoader.getTranslation(this.selectedIdioma);
    this.translate.use(this.selectedIdioma);
  }
}
