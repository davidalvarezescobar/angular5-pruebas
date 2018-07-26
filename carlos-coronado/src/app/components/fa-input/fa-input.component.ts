import { Component, OnInit, Input, ContentChild, HostBinding } from '@angular/core';
import { OutlineBorderDirective } from '../../directives/outline-border.directive';

@Component({
  selector: 'app-fa-input',
  templateUrl: './fa-input.component.html',
  styleUrls: ['./fa-input.component.less']
})
export class FaInputComponent implements OnInit {
  _faIcon;
  @Input() set faIcon(icon){
    this._faIcon = `fa-${icon}`
  }

  @ContentChild(OutlineBorderDirective) outlineBorder: OutlineBorderDirective;

  @HostBinding('class.outline') get classOutline() {
    return this.outlineBorder.focus;
  }

  constructor() { }

  ngOnInit() { }

}
