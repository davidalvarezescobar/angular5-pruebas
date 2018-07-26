import { Component } from '@angular/core';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public heroService: HeroService) { }

  stopSubscription() {
    this.heroService.forceReload();
  }

  reload() {
    this.heroService.update$.next();
  }
}
