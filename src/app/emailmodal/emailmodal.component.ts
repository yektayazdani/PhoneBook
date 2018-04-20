import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ServiceService } from '../service.service';
import { debug } from 'util';

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
      this.allEmails = response["data"];
      console.log("email fetched", this.allEmails)
    }, (error)=>{console.log(error)})
  }

  addEmailId(){
    let emailObject = {
      "emailId": this.newEmailId,
      "contactId": this.emails
    }
    this.service.addEmailid(this.emails,emailObject).subscribe(()=>{
      this.loadEmails(this.emails)
    })
    this.newEmailId = "";
  }

  deleteEmailId(id){
    this.service.deleteEmail(this.emails, id).subscribe(()=>{this.loadEmails(this.emails)})
  }
  editStateChanged(index)
  {
    console.log(index)
    let emailObject = {
      "emailId": index.emailId,
      "id":index.id,
      "contactId":index.contactId
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
