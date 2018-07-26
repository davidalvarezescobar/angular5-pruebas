import { Component, OnInit } from '@angular/core';
import { Operation } from './operation';
import { OperationsService } from './operations.service';


@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {
  numberOfOperations = 0;
  operations: Operation[] = [];

  constructor(private operationsService: OperationsService) { }

  ngOnInit() {
    this.refreshData();
  }

  saveOperation(operation) {
    this.operationsService.saveOperation(operation);
    this.refreshData();
  }

  deleteOperation(operation) {
    this.operationsService.deleteOperation(operation);
    this.refreshData();
  }

  refreshData() {
    this.numberOfOperations = this.operationsService.getNumberOfOperations();
    this.operations = this.operationsService.getOperationsList();
  }

  // cloneOperation(operation) {
  //   return {...operation};
  // }
}
