import { Product } from "./Product";

export type Order = {
    id: number;
    date: string;
    status: string;
    totalPrice: number;
    track: string;
    products: Product[];
};
