import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PreloaderService } from './services/http/preloader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  public loading;

  constructor(
    private preloaderSrv: PreloaderService
  ) { }

  ngOnInit() {
    this.preloaderSrv.observable$.subscribe(res => {
      this.loading = res;
    });
  }
}
