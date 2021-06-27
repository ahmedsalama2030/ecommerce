import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderListDto } from '../models/Dtos/OrderListDto';
import { PaginationResult } from '../models/Pagination ';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  
  baseUrl=environment.apiUrl;

  constructor(private http:HttpClient ,private authService:AuthService) { }
  get(pageNumber?:any,itemsPerPage?:any,filterType?:any,filterText?:any):Observable<PaginationResult<OrderListDto[]>>{
    const paginationResult:PaginationResult<OrderListDto[]>= new PaginationResult<OrderListDto[]>();
    let params=new HttpParams();
    if(pageNumber!=null&&itemsPerPage !=null){
      params=params.append('pageNumber',pageNumber);
      params=params.append('pageSize',itemsPerPage);
      params=params.append('filterType',filterType);
      params=params.append('filterText',filterText);
    }
    
    return this.http.get<OrderListDto[]>(this.baseUrl+this.authService.decodedToken?.nameid+'/Orders', {observe:'response',params}).pipe(
      map(response=>{
        paginationResult.result=response.body || undefined ;   
        if(response.headers.get('Pagination')!=null){
          paginationResult.pagination=JSON.parse(response.headers.get('Pagination')||'');
        }
        return paginationResult;
      })
    );
  }


  register(){
  return this.http.post(this.baseUrl+this.authService.decodedToken?.nameid+'/Orders/register/',{});
 
 }


 registerOnline(token: any) {
  return this.http.post(environment.apiUrl + this.authService.decodedToken?.nameid + '/Orders/registerOnline/'+token, {})
}
}
 