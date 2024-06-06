import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors'; // Importe o pacote cors
import { router as nivelRoutes, swaggerConfig as nivelSwaggerConfig } from './src/routes/nivelRoutes'
import { router as developerRoutes, swaggerConfig as developerSwaggerConfig } from './src/routes/developerRoutes';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

// Middleware para fazer o parse do corpo da requisição como JSON
app.use(express.json());

// Adicione a rota Swagger para os níveis
app.use('/api-docs/hub/niveis', swaggerUi.serve, swaggerUi.setup(nivelSwaggerConfig));

// Adicione a rota Swagger para os desenvolvedores
app.use('/api-docs/hub/desenvolvedores', swaggerUi.serve, swaggerUi.setup(developerSwaggerConfig));

// Rotas da API
app.use('/api/niveis', nivelRoutes);
app.use('/api/desenvolvedores', developerRoutes);

// Iniiando o servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
