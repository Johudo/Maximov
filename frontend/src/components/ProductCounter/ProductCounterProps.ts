import { BasketItem } from "../../types/BasketItem";

export interface ProductCounterProps {
    defaultValue: number;
    product: BasketItem;
    withoutDispatch?: boolean;
    setCount?: (count: number) => void;
}
