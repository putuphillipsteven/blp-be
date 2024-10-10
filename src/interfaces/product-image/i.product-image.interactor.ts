import { ProductImage } from '../../entities/product-image';
import { CreateProductImageProps, DeleteProductImageProps } from './i.product-image';

export interface IProductImageInteractor {
	create(args: CreateProductImageProps): Promise<ProductImage | undefined>;
	delete(args: DeleteProductImageProps): Promise<ProductImage | undefined>;
}
