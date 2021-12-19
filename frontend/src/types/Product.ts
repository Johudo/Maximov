import { Characteristic } from "./Characteristic";
import { Country } from "./Country";
import { ProductProvider } from "./ProductProvider";
import { ProductType } from "./ProductType";

export type Product<TProvider = ProductProvider, TCountry = Country, TCharacteristics = Array<Characteristic>> = {
    id: number;
    name: string;
    price: string;
    сreation_year: number;
    image: string;

    type: ProductType;
    provider: TProvider;
    country: TCountry;
    characteristics: TCharacteristics;
};
