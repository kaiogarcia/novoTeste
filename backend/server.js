"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const cors_1 = __importDefault(require("cors")); // Importe o pacote cors
const nivelRoutes_1 = require("./src/routes/nivelRoutes");
const developerRoutes_1 = require("./src/routes/developerRoutes");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use((0, cors_1.default)());
// Middleware para fazer o parse do corpo da requisição como JSON
app.use(express_1.default.json());
// Adicione a rota Swagger para os níveis
app.use('/api-docs/hub/niveis', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(nivelRoutes_1.swaggerConfig));
// Adicione a rota Swagger para os desenvolvedores
app.use('/api-docs/hub/desenvolvedores', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(developerRoutes_1.swaggerConfig));
// Rotas da API
app.use('/api/niveis', nivelRoutes_1.router);
app.use('/api/desenvolvedores', developerRoutes_1.router);
// Iniiando o servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
