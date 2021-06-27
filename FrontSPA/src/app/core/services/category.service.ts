import { Category } from 'src/app/core/models/category';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
 import { PaginationResult } from '../models/Pagination ';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl=environment.apiUrl+'Categories/';
constructor(private http:HttpClient) { }


get(pageNumber?:any,itemsPerPage?:any,filterType?:any,filterText?:any):Observable<PaginationResult<Category[]>>{
  const paginationResult:PaginationResult<Category[]>= new PaginationResult<Category[]>();
  let params=new HttpParams();
  if(pageNumber!=null&&itemsPerPage !=null){
    params=params.append('pageNumber',pageNumber);
    params=params.append('pageSize',itemsPerPage);
    params=params.append('filterType',filterType);
    params=params.append('filterText',filterText);
  }
  return this.http.get<Category[]>(this.baseUrl+"top", {observe:'response',params}).pipe(
    map(response=>{
      paginationResult.result=response.body || undefined ; 
      if(response.headers.get('Pagination')!=null){
        paginationResult.pagination=JSON.parse(response.headers.get('Pagination')||'');
      }
      return paginationResult;
    })
  );
  
  }
  getTopCategory():Observable<Category[]>{
    return this.http.get<Category[]>(this.baseUrl+"top");
  }
  getAll():Observable<Category[]>{
    return this.http.get<Category[]>(this.baseUrl+'all');
  }

}
