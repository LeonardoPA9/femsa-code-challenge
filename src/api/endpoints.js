import { PRODUCTS_CLIENT as client } from "./client";

export const fetchAllProducts = () => client.get("products");
