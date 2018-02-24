import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-emailmodal',
  templateUrl: './emailmodal.component.html',
  styleUrls: ['./emailmodal.component.css']
})
export class EmailmodalComponent implements OnInit {
  editclicked:boolean;
  newEmailId;
  @Input() emails;
  allEmails;
  constructor(public activeModal: NgbActiveModal, private service:ServiceService) {
  this.editclicked = false;
    
  }
  ngOnInit() {
    console.log(this.emails)
    this.loadEmails(this.emails)
  }
  loadEmails(emailid)
  {
    this.service.getEmails(emailid).subscribe((response)=>{
      this.allEmails = response;
      console.log("email fetched")
    }, (error)=>{console.log(error)})
  }

  addEmailId(){
    let emailObject = {
      "emailId": this.newEmailId,
    }
    this.service.updateEmail(this.emails,emailObject).subscribe((response)=>{
      this.loadEmails(this.emails)
    })
  }

  deleteEmailId(id){
    this.service.deleteEmail(this.emails, id).subscribe((response)=>{this.loadEmails(this.emails)})
  }
  editStateChanged(index)
  {
    let emailObject = {
      "emailId": index.emailId,
      "id":index.id
    }
    if(index.editclicked){
      index.editclicked = false;
      this.service.updateEmail(this.emails,emailObject).subscribe((response)=>{})
    }
    else{
      index.editclicked = true;
    }
    console.log(index)

  }

}
