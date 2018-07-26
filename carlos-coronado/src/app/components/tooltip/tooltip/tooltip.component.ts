import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.less']
})
export class TooltipComponent implements OnInit {
  @Input() msg = 'sin tooltip';
  @Input() @HostBinding('class.error') errorCss;
  
  constructor() { }

  ngOnInit() {
  }

}
