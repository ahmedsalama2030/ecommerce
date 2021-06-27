import { AuthService } from 'src/app/core/services/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginationResult } from '../models/Pagination ';
import { ShoppingCart } from '../models/shoppingCart';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  baseUrl=environment.apiUrl;
  constructor(private http:HttpClient ,
    private router:Router,
    private authService:AuthService) { }
   
 
  get(pageNumber?:any,itemsPerPage?:any,filterType?:any,filterValue?:any,filterValueTo?:any,filterValueFrom?:any,sortType?:any):Observable<PaginationResult<ShoppingCart[]>>{
    const paginationResult:PaginationResult<ShoppingCart[]>= new PaginationResult<ShoppingCart[]>();
    let params=new HttpParams();
    if(pageNumber!=null&&itemsPerPage !=null){
      params=params.append('pageNumber',pageNumber);
      params=params.append('pageSize',itemsPerPage);
      params=params.append('filterType',filterType);
       params=params.append('sortType',sortType);

    }
    return this.http.get<ShoppingCart[]>(this.baseUrl+this.authService.decodedToken?.nameid+'/ShoppingCarts/', {observe:'response',params}).pipe(
      map(response=>{
        paginationResult.result=response.body || undefined ; 
        if(response.headers.get('Pagination')!=null){
          paginationResult.pagination=JSON.parse(response.headers.get('Pagination')||'');
        }
         return paginationResult;
      })
    );
    
    }

    getTotalprice():Observable<any>{
return this.http.get(this.baseUrl+this.authService.decodedToken?.nameid+'/ShoppingCarts/totalprice/');
    }
    getTotalCount():Observable<any>{
      const Userid=this.authService.decodedToken?.nameid;
      if(Userid===undefined)
      return of();
      return this.http.get(this.baseUrl+this.authService.decodedToken?.nameid+'/ShoppingCarts/totalCount/');
      
    }
   updateQuantity(model:any){
    const Userid=this.checkUser();
     return this.http.put(this.baseUrl+Userid+'/ShoppingCarts/updatequantity/',model);
   }

   register(model:any){
     const Userid=this.checkUser();
    return this.http.post(this.baseUrl+ Userid+'/ShoppingCarts/register/',model);

   }
   delete(id:any){ 
    const Userid=this.checkUser();
    return this.http.delete(this.baseUrl+Userid+'/ShoppingCarts/'+id);
    }

    private checkUser():string |undefined{
      let id=this.authService.decodedToken?.nameid;
     if(id==undefined || id==null){
      this.router.navigate(["/auth"]);
      return;
     }
     else 
     return id

    }

}
