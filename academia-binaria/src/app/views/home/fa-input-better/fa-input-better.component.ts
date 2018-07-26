import { Component, OnInit, Input, ContentChild, AfterContentInit, HostBinding } from '@angular/core';
import { InputHandlerDirective } from './input-handler.directive';

@Component({
  selector: 'fa-input-better',
  templateUrl: './fa-input-better.component.html',
  styleUrls: ['./fa-input-better.component.css']
})
export class FaInputBetterComponent implements OnInit, AfterContentInit {
  @Input() icon: string;
  @ContentChild(InputHandlerDirective) input: InputHandlerDirective;
  @HostBinding('class.outline') focus: boolean = false;

  constructor() { }

  ngOnInit() { }

  ngAfterContentInit() {
    this.input.focus.subscribe(x => this.focus=x);
  }

  get classes() {
    console.log('cambio en classes');
    return `fa fa-${this.icon}`;
  }

}
