import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http'
import { Options } from 'selenium-webdriver/safari';
@Injectable()
export class ServiceService {

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:4200'
    })
  };
  private url = "http://localhost:8083/contacts/"
  constructor(private http: HttpClient) { }

  getContacts(){
    return this.http.get(this.url)
  }

  updateContact(body:object){
    return this.http.post(this.url, body)
  }
  
  deleteContact(id){
    return this.http.delete(this.url + id)
  }

  addContact(body:object){
    return this.http.post(this.url, body)
  }

  getEmails(id){
    return this.http.get(this.url + id + '/emails/')
  }

  updateEmail(id, body){
    return this.http.post(this.url + id + '/emails/', body, this.httpOptions)
  }
  
  addEmailid(id, body){
    return this.http.post(this.url + id + '/emails/', body, this.httpOptions)
  }

  deleteEmail(id,emailid){
    return this.http.delete(this.url + id + '/emails/' + emailid, this.httpOptions)
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
