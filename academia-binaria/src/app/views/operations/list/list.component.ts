import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Operation } from '../operation';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() numberOfOperations = 0;
  @Input() operations: Operation[] = [];
  @Output() delete = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  deleteOperation(operation) {
    this.delete.emit(operation);
  }
}
