import { Product } from "./product";

export interface ShoppingCart {
    id:string;
    quantity:number;
    userId:string;
    createdDate:Date;
    product:Product;
    
}
