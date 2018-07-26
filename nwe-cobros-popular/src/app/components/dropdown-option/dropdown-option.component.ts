import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nwe-dropdown-option',
  templateUrl: './dropdown-option.component.html',
  styleUrls: ['./dropdown-option.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class DropdownOptionComponent implements OnInit {
  open = false;
  @Input() config;
  @Output() optionClicked: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  selectedRow(event, op) {
    op.toggle(event);
    this.open = !this.open;
  }

  executeAction(event, action, op) {
    this.optionClicked.emit(action.value);
    op.hide();
    this.open = !this.open;
  }

}
