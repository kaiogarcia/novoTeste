import express from 'express';
import * as nivelController from '../controller/nivelController'; // Ajuste o caminho do controller conforme necessário
import { validateNivel } from '../utils/validator';
import { swaggerConfig } from './developerRoutes'; // Importe o swaggerConfig como um objeto nomeado

const router = express.Router();

router.get('/', nivelController.listarNiveis);
router.post('/', nivelController.cadastrarNivel);
router.put('/:id', nivelController.editarNivel);
router.delete('/:id', nivelController.removerNivel);

export { router, swaggerConfig }; // Exporte o router e o swaggerConfig
