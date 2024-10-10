import { Product } from '../../entities/product';
import {
	CreateProductProps,
	DeleteProductProps,
	GetProductFilterProps,
	GetProductReturnProps,
	UpdateProductProps,
} from './i.product';

export interface IProductRepository {
	createProduct(args: CreateProductProps): Promise<Product | undefined>;
	updateProduct(args: UpdateProductProps): Promise<Product | undefined>;
	getProduct(args: GetProductFilterProps): Promise<GetProductReturnProps | undefined>;
	deleteProduct(args: DeleteProductProps): Promise<Product | undefined>;
}
