import { ProductColor } from "./ProductColor";
import { ProductImage } from "./productImage";

export interface Product {
    id: string;
    name: string;
    nameAr: string;
    price:number;
    disctription?: string;
    disctriptionAr?: string;
    discount?:number;
    imageMain?:string;
    brand?: string;
    returnDays?:number;
    shippingPrice?:number;
    expireDate?:Date;
    categoryId?: string;
    categoryName?: string;
    categoryNameAr?: string;
    productImages?:ProductImage[];
    ProductColors?:ProductColor[];
    isShop:boolean;


}
