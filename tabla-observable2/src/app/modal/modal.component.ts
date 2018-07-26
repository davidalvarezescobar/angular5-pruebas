import { Component, OnInit, HostBinding, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less']
})
export class ModalComponent implements OnInit {
  @HostBinding('class.visible') @Input() showModal = false;
  @Output() onClose = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
