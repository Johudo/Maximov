import { ProductType } from "./ProductType";

export type Product = {
    id: number;
    name: string;
    price: string;
    сreation_year: number;
    image: string;

    type: ProductType;
    provider: null;
    country: null;
};
