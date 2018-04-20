import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http'
import { Options } from 'selenium-webdriver/safari';
import { headersToString } from 'selenium-webdriver/http';
@Injectable()
export class ServiceService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  private urlSp = "http://localhost:8083/contacts/"
  private url = "http://127.0.0.1:3000/api/v1/contacts"


  constructor(private http: HttpClient) { }

  getContacts(){
    return this.http.get(this.url)
  }

  // updateContact(body:object){
  //   return this.http.post(this.url, body)
  // }

  updateContact(body:object){
    return this.http.put(this.url, body)
  }
  
  deleteContact(id){
    return this.http.delete(this.url + "/" + id)
  }

  addContact(body:object){
    return this.http.post(this.url, body)
  }

  getEmails(id){
    return this.http.get(this.url + "/" + id + '/emails')
  }

  updateEmail(id, body){
    debugger
    return this.http.put(this.url + "/" + id + '/emails', body)
  }
  
  addEmailid(id, body){
    return this.http.post(this.url + "/" + id + '/emails', body)
  }

  deleteEmail(id,emailid){
    return this.http.delete(this.url + "/" + id + '/emails/' + emailid)
  }
  oldgetContacts(){
    let contacts:Object = [
    {
        "firstName": "pj",
        "lastName": "java22",
        "phoneNumber": "4089913266",
        "id": 5
    },
    {
        "firstName": "siavash",
        "lastName": "bakht",
        "phoneNumber": "40203423433",
        "id": 7
    }]
    return contacts;
  }

  oldgetEmails(){
    let emails:object = [
    {
        "id": 5,
        "contact": {
            "firstName": "yekta",
            "lastName": "yazdani",
            "phoneNumber": "4089913266",
            "id": 2
          },
        "emailId": "yektayazd@gmail.com"
    },
    {
        "id": 6,
        "contact": {
            "firstName": "yekta",
            "lastName": "yazdani",
            "phoneNumber": "4089913266",
            "id": 2
          },
        "emailId": "yektayazd@gmailhaha.com"
    }
    ]
    return emails;
  }
}
