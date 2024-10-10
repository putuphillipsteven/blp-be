import { Product } from '../../entities/product';

export interface CreateProductProps extends Product {}

export interface UpdateProductProps extends CreateProductProps {
	id: number;
}

export interface GetProductFilterProps {
	product_name: string;
	product_category_id: number;
	pageSize: number;
	page: number;
	sort: string;
	stock: number;
}

export interface GetProductReturnProps {
	total: number;
	data: Product[];
}

export interface DeleteProductReturnProps {
	message: string;
	data: Product;
}

export interface UpdateProductProps extends CreateProductProps {}

export interface DeleteProductProps {
	id: number;
}
