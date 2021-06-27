import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginationResult } from '../models/Pagination ';
import { ProductBestSeller } from '../models/ProductBestSeller';

@Injectable({
  providedIn: 'root'
})
export class ProductRecentViewService {
  baseUrl=environment.apiUrl+'ProductMostViewRecently/';
  constructor(private http:HttpClient) { }
  getTopProduct():Observable<ProductBestSeller[]>{
    return this.http.get<ProductBestSeller[]>(this.baseUrl+"top");
  }
  
  get(pageNumber?:any,itemsPerPage?:any,filterType?:any,filterText?:any):Observable<PaginationResult<ProductBestSeller[]>>{
    const paginationResult:PaginationResult<ProductBestSeller[]>= new PaginationResult<ProductBestSeller[]>();
    let params=new HttpParams();
    if(pageNumber!=null&&itemsPerPage !=null){
      params=params.append('pageNumber',pageNumber);
      params=params.append('pageSize',itemsPerPage);
      params=params.append('filterType',filterType);
      params=params.append('filterText',filterText);
    }
    return this.http.get<ProductBestSeller[]>(this.baseUrl, {observe:'response',params}).pipe(
      map(response=>{
        paginationResult.result=response.body || undefined ; 
        if(response.headers.get('Pagination')!=null){
          paginationResult.pagination=JSON.parse(response.headers.get('Pagination')||'');
        }
        return paginationResult;
      })
    );
    
    }
  
  }
  