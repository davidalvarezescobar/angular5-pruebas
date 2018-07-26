import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { PreloaderService } from './preloader.service';


@Component({
  selector: 'app-root',
  template: `
    <img *ngIf="loading | async" class="preloader" src='assets/loader_santander.gif' alt="Loading logo santander" type="logo" title="Logo santander"/>
  <!-- <img *ngIf="loading" class="preloader" src='assets/loader_santander.gif' alt="Loading logo santander" type="logo" title="Logo santander"/> -->
    <app-menu></app-menu>
    <router-outlet [hidden]="(loading | async) === false"></router-outlet>
  <!-- <router-outlet [hidden]="!loading"></router-outlet> -->
  `,
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  loading;

  constructor(private preloaderSrv: PreloaderService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    // FUNCIONA incluso con 'OnPush' y sin necesidad de utilizar 'changeDetector'
    this.loading = this.preloaderSrv.observable$.delay(0);

    // sólo FUNCIONA sin el 'OnPush'
    // this.preloaderSrv.observable$.subscribe(res => {
    //   setTimeout(() => {
    //     this.loading = res;
    //     this.changeDetector.detectChanges(); // al poner esta línea, ya funcionaría con 'OnPush'
    //   });
    // });

    // sólo FUNCIONA sin el 'OnPush'
    // this.preloaderSrv.observable$.subscribe(async (res) => {
    //   this.loading = await res;
    //   this.changeDetector.detectChanges(); // al poner esta línea, ya funcionaría con 'OnPush'
    // });

    // NO FUNCIONA
    // setTimeout(() => this.preloaderSrv.observable$.subscribe(res => this.loading=res), 0);

  }

}
