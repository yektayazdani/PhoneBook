import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
@Injectable()
export class ServiceService {

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

  getEmails(){
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
