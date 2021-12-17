import { Product } from "../../types/Product";

export type CustomState = {
    products: Array<Product>;
};

export const defaultCustomState: CustomState = {
    products: [],
};
