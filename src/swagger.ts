import swaggerAutogen from 'swagger-autogen';

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
	},
};

const outputFile = './swagger_output.json';
const endpointFiles = ['./src/router.ts'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointFiles, doc);
