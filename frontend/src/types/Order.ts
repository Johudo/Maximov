import { PaymentTypeEnum } from "../enums/PaymentTypeEnum";
import { Product } from "./Product";

export type Order<TProduct = Product> = {
    id: number;
    datetime: string;
    payment_type: PaymentTypeEnum;
    storage: number;
    order_products: Array<{ id: number; product: TProduct; count: number }>;
};
