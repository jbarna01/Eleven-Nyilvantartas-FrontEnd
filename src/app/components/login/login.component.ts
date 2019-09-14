import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CoreService} from "../../services/core.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userName = '';
  public password = '';

  @Input('paramData') public isBelepve;
  @Output() public childEvent = new EventEmitter();


  constructor(private core: CoreService) { }


  ngOnInit() {
  }

  belepes() {
    if ((this.userName == 'jbarna') && (this.password = 'bb11JJ22')) {
      this.childEvent.emit('OK');
    }
  }

}
