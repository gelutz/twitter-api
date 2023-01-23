import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express'

const options = {
	definition: {
		openapi: "3.0.1",
		info: {
			title: "LogRocket Express API with Swagger",
			version: "0.1.0",
			description:
				"This is a simple CRUD API application made with Express and documented with Swagger",
			license: {
				name: "MIT",
				url: "https://spdx.org/licenses/MIT.html",
			},
			contact: {
				name: "LogRocket",
				url: "https://logrocket.com",
				email: "info@email.com",
			},
		},
		servers: [
			{
				url: "http://localhost:3000",
			},
		],
	},
	apis: ["./routes/*.js"],
};

const SwaggerOptions = swaggerJSDoc(options);

export const setup = swaggerUi.setup(SwaggerOptions, {
	swaggerUrl: './swagger.json'
})
