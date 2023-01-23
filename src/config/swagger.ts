import { readFileSync } from "fs";


const swaggerFile = readFileSync(__dirname + 'swagger.json', 'utf-8')
console.log(JSON.parse(swaggerFile))
export const SwaggerConfig = JSON.parse(swaggerFile)
