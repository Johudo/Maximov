import { ProductType } from "./ProductType";

export type CatalogProductFilter = {
    price?: { max: number; min: number };
    types?: ProductType[];
};
