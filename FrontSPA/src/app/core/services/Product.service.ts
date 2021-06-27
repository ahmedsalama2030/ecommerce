import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginationResult } from '../models/Pagination ';
import { Product } from '../models/product';
 
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl=environment.apiUrl+'Products/';
  constructor(private http:HttpClient) { }
   
 
  get(pageNumber?:any,itemsPerPage?:any,filterType?:any,filterValue?:any,filterValueFrom?:any,filterValueTo?:any,sortType?:any):Observable<PaginationResult<Product[]>>{
    const paginationResult:PaginationResult<Product[]>= new PaginationResult<Product[]>();
    let params=new HttpParams();
    if(pageNumber!=null&&itemsPerPage !=null){
      params=params.append('pageNumber',pageNumber);
      params=params.append('pageSize',itemsPerPage);
      params=params.append('filterType',filterType);
      params=params.append('filterValue',filterValue);
      params=params.append('filterValueTo',filterValueTo);
      params=params.append('filterValueFrom',filterValueFrom);
      params=params.append('sortType',sortType);

    }
    return this.http.get<Product[]>(this.baseUrl, {observe:'response',params}).pipe(
      map(response=>{
        paginationResult.result=response.body || undefined ; 
        if(response.headers.get('Pagination')!=null){
          paginationResult.pagination=JSON.parse(response.headers.get('Pagination')||'');
        }
        return paginationResult;
      })
    );
    
    }

    getById(id:any):Observable<Product>{
      return this.http.get<Product>(this.baseUrl+id);
    }
    getBrands():Observable<string[]>{
      return this.http.get<string[]>(this.baseUrl+'brand');
    }
  
  }
  