import { ProductImage } from '../../../entities/product-image';
import { CreateProductImageProps, DeleteProductImageProps } from './i.product-image';

export interface IProductImageRepository {
	createProductImage(args: CreateProductImageProps): Promise<ProductImage | undefined>;
	deleteProductImage(args: DeleteProductImageProps): Promise<ProductImage | undefined>;
}
