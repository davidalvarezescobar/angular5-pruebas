import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'nwe-header-title',
  templateUrl: './header-title.component.html',
  styleUrls: ['./header-title.component.less']
})
export class HeaderTitleComponent implements OnInit {

  @Input() data = {
    title: '',
    subtitle: '',
    iconFdf: false,
    iconTxt: false,
    iconExcel: false,
    iconPrint: false
  };
  @Output() actionClick = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }

  action(type) {
    this.actionClick.emit(type);
  }

  getBack() {
    window.history.back();
  }

}
