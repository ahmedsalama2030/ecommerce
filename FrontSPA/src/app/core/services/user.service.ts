import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl=environment.apiUrl;
  
constructor( private http:HttpClient,private authService:AuthService) { }
updateUser(model:any){
  console.log(this.baseUrl);
  return this.http.post(this.baseUrl+"Users/UpdateUser/",model);

 }
 changePhoto(file:any){
  return this.http.post(
    this.baseUrl+"Users/changePhoto/"+this.authService.decodedToken?.nameid,
    file,
     {reportProgress: true, observe: 'events'}
    );

 }

 
}
