import { ProductImage } from '../../entities/product-image';

export interface CreateProductImageProps extends ProductImage {}

export interface DeleteProductImageProps {
	id: number;
	product_id: number;
}
