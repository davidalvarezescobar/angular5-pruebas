import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Operation } from '../operation';
import { MascaraImportePipe } from '../../../shared/mascara-importe.pipe';
import { DecimalEspPipe } from '../../../shared/decimal-esp.pipe';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
  providers: [
    MascaraImportePipe,
    DecimalEspPipe
  ]
})
export class NewComponent implements OnInit {
  @Input() numberOfOperations = 0;
  @Output() save = new EventEmitter();

  title = "Cash Flow";
  kindsOfOperations = ["Income", "Expense"];
  operation: Operation = new Operation();

  constructor(
    private mascara: MascaraImportePipe,
    private decimalEspPipe: DecimalEspPipe
  ) { }

  ngOnInit() {
    this.operation.amount = this.decimalEspPipe.transform( 0 );
  }

  saveOperation() {
    this.save.emit(this.operation);
    this.operation = new Operation();
  }

  aplicarMascara(val) {
    this.operation.amount = this.mascara.transform(val, '15,2');
  }
}
