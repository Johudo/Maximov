import { Product } from "./Product";

export type ProductType = {
    id: number;
    name: string;

    product_set?: Array<Product>;
};
