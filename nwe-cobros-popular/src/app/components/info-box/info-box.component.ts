import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'nwe-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.less']
})
export class InfoBoxComponent implements OnInit {

  @Input() data = {
    text: ''
  };

  constructor() { }

  ngOnInit() {
  }

}
