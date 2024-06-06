import express from 'express';
import * as developerController from '../../../backend/src/controller/developerController';
import { validateDeveloper } from '../utils/validator';
import swaggerConfig from '../swagger/swaggerConfig'; // Importe o swaggerDocument aqui

const router = express.Router();


router.get('/', developerController.listarDevelopers);
router.post('/', developerController.criarDeveloper);
router.put('/:id', validateDeveloper, developerController.atualizarDeveloper);
router.delete('/:id', developerController.deletarDeveloper);

export { router, swaggerConfig }; // Exporte o router e o swaggerDocument



