import { Product } from '../../entities/product';
import {
	CreateProductProps,
	DeleteProductProps,
	GetProductFilterProps,
	GetProductReturnProps,
	UpdateProductProps,
} from './i.product';

export interface IProductInteractor {
	create(args: CreateProductProps): Promise<Product | undefined>;
	update(args: UpdateProductProps): Promise<Product | undefined>;
	get(args: GetProductFilterProps): Promise<GetProductReturnProps | undefined>;
	delete(args: DeleteProductProps): Promise<Product | undefined>;
}
