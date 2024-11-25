import swaggerAutogen from 'swagger-autogen';
import { Product } from './entities/product';

const doc = {
	info: {
		version: 'v1.0.0',
		title: 'Birulangit Photography Back End',
		description: 'Swagger Documentation',
	},
	servers: [
		{
			url: 'http://localhost:8080',
			description: '',
		},
	],
	components: {
		securitySchemes: {
			bearerAuth: {
				type: 'http',
				scheme: 'bearer',
			},
		},
		schemas: {
			CreateProductRequest: {
				type: 'object',
				properties: Product,
			},
		},
	},
};

const outputFile = './swagger_output.json';
const endpointFiles = ['./src/drivers/routes/**'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointFiles, doc);
