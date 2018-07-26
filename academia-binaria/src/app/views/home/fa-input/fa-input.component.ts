import { Component, OnInit, Input, Output, EventEmitter, HostBinding, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'fa-input',
  templateUrl: './fa-input.component.html',
  styleUrls: ['./fa-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaInputComponent implements OnInit {

  @Input() placeHolder: string;
  @Input() icon: string;

  @HostBinding('class.outline') focus: boolean = false;
  @Output() value = new EventEmitter();
  inputFocus = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.inputFocus.subscribe(x => this.focus=x);
  }

  // Los getters se ejecutan cuando se detecta un cambio en los datos de entrada @Input
  // el nombre del getter tiene que coincidir con el nombre usado en la plantilla HTML
  get iClass() {
    console.log('getter iClass', this.icon);
    return `fa fa-${this.icon}`;
  }

  // el nombre del getter tiene que coincidir con el nombre usado en la plantilla HTML
  get pHolder() {
    console.log('getter pHolder', this.placeHolder);
    return this.placeHolder.trim();
  }

}
