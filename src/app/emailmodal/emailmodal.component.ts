import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-emailmodal',
  templateUrl: './emailmodal.component.html',
  styleUrls: ['./emailmodal.component.css']
})
export class EmailmodalComponent implements OnInit {
  editclicked:boolean;
  @Input() emails;

  constructor(public activeModal: NgbActiveModal) {
  this.editclicked = false;
    
  }
  ngOnInit() {
    console.log(this.emails)
  }
  editStateChanged(index)
  {
    if(index.editclicked){
      index.editclicked = false;
    }
    else{
      index.editclicked = true;
    }
    console.log(index)

  }

}
