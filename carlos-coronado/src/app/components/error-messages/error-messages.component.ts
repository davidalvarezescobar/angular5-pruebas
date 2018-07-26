import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.css']
})
export class ErrorMessagesComponent implements OnInit {
  @Input() controlError: FormControl;

  constructor() { }

  ngOnInit() { }
  
  get validation() {
    for(let validatorType in this.controlError) {
      if(this.controlError.hasOwnProperty(validatorType)) {
        return this.validationMsg(validatorType, this.controlError[validatorType]);
      }
    }
    return null;
  }

  validationMsg(validatorType, validatorInfo) {
    let errors = {
      required: 'Campo obligatorio',
      minlength: `Tamaño mínimo: ${validatorInfo.requiredLength} caracteres`,
      eventCode: 'Sólo números'
    };
    return errors[validatorType];
  }
}
