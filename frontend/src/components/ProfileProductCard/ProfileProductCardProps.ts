import { Product } from "../../types/Product";

export default interface ProfileProductCardProps {
    product: Product<unknown, unknown, unknown>;
    count: number;
}
