import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { EmailmodalComponent } from '../emailmodal/emailmodal.component';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contacts;
  emails;
  editclicked:boolean;
  closeResult: string;

  constructor(private service:ServiceService, private modalService: NgbModal) {
    this.emails = service.getEmails();
    let editclicked:false;
    let x:string="test"
   }

  ngOnInit() {
    this.loadAllContacts()
  }

  loadAllContacts()
  {
    this.service.getContacts()
      .subscribe((response) => {this.contacts = response; console.log(this.contacts)}, (error)=> {console.log(error)})
  }

  editStateChanged(index)
  {
    if(index.editclicked){
      index.editclicked = false;
      this.service.updateContact(index).subscribe(response => {
      }, error => {console.log(error)})
    }
    else{
      index.editclicked = true;
    }
  };

  removeContact(id){
    this.service.deleteContact(id).subscribe(response => {
      this.loadAllContacts()
    }, error => {console.log(error)}
    )
  }

  addItem()
  {
    let body:object = {
      "firstName" : "",
      "lastName" : "",
      "phoneMumber" : ""
    }
    
  }
  
  open(contactid) {
    //console.log(contactid, this.emails)
    const modalRef = this.modalService.open(EmailmodalComponent);
    modalRef.componentInstance.emails = this.emails;
  }
}
