import { createCartQuery } from "../query/cartQuery";

export const createCartservice =async (customer_name: string) => {
    try {
        const res = await createCartQuery (
            customer_name
        );
        return res;
    } catch (err) {
        throw err;
    }
}