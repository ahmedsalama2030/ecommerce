import { OrderPersonInfo } from "./OrderPersonInfo";

export interface RegisterOnlineOrderDto {
    OrderPersonInfo: OrderPersonInfo;
    stripToken:string;
}
