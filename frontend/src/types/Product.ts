import { ProductType } from "./ProductType";

export type Product<TProvider = Provider, TCountry = Country, TCharacteristics = Characteristics> = {
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

type Provider = object;
type Country = object;
type Characteristics = Array<{
    name: string;
    value: string;
}>;
