import { Injectable } from '@angular/core';
import { Operation } from './operation';


@Injectable()
export class OperationsService {
  private operations: Operation[] = [];

  constructor() { }

  getNumberOfOperations(){
    return this.operations.length;
  }

  getOperationsList() {
    return this.operations;
  }

  getOperationById(id) {
    return this.operations.find(o => o._id === id);
  }

  saveOperation(operation) {
    operation._id = new Date().getTime().toString();
    console.log('id:', operation._id);
    this.operations.push(operation);
  }

  deleteOperation(operation) {
    const index = this.operations.indexOf(operation);
    this.operations.splice(index, 1);
  }
}
