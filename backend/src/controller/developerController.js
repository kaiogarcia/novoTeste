"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletarDeveloper = exports.atualizarDeveloper = exports.criarDeveloper = exports.listarDevelopers = void 0;
const developerService = __importStar(require("../services/developerService"));
/**
 * @swagger
 * /api/desenvolvedores:
 *   get:
 *     summary: Retorna a lista de desenvolvedores existentes.
 *     tags:
 *       - Desenvolvedores
 *     responses:
 *       200:
 *         description: Resposta bem-sucedida
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Developer'
 */
const listarDevelopers = async (req, res) => {
    try {
        const developers = await developerService.getAllDevelopers();
        if (developers.length === 0) {
            return res.status(404).json({ error: 'Nenhum desenvolvedor cadastrado.' });
        }
        res.json(developers);
    }
    catch (error) {
        res.status(500).json({ error: 'Falha ao buscar desenvolvedores.' });
    }
};
exports.listarDevelopers = listarDevelopers;
/**
 * @swagger
 * /api/desenvolvedores:
 *   post:
 *     summary: Cria um novo desenvolvedor.
 *     tags:
 *      - Desenvolvedores
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nivel_id:
 *                 type: number
 *               nome:
 *                 type: string
 *               sexo:
 *                 type: string
 *               data_nascimento:
 *                 type: string
 *                 format: date
 *               hobby:
 *                 type: string
 *     responses:
 *       201:
 *         description: Desenvolvedor criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Developer'
 *       500:
 *         description: Falha ao criar desenvolvedor.
 */
const criarDeveloper = async (req, res) => {
    try {
        const { nome, nivel_id, sexo, data_nascimento, hobby } = req.body;
        const novoDeveloper = await developerService.createDeveloper({ nome, nivel_id, sexo, data_nascimento, hobby });
        res.status(201).json(novoDeveloper);
    }
    catch (error) {
        console.error('Erro ao criar desenvolvedor:', error);
        res.status(500).json({ error: 'Falha ao criar desenvolvedor.' });
    }
};
exports.criarDeveloper = criarDeveloper;
/**
 * @swagger
 * /api/desenvolvedores/{id}:
 *   put:
 *     summary: Atualiza um desenvolvedor existente.
 *     tags:
 *      - Desenvolvedores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: ID do desenvolvedor a ser atualizado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               hobby:
 *                 type: string
 *               nivel_id:
 *                 type: number
 *               sexo:
 *                 type: string
 *               data_nascimento:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Desenvolvedor atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Developer'
 *       500:
 *         description: Falha ao atualizar desenvolvedor.
 */
const atualizarDeveloper = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, nivel_id, sexo, data_nascimento, hobby } = req.body;
        const developerAtualizado = await developerService.updateDeveloper(Number(id), { nome, nivel_id, sexo, data_nascimento, hobby });
        res.json(developerAtualizado);
    }
    catch (error) {
        res.status(500).json({ error: 'Falha ao atualizar desenvolvedor.' });
    }
};
exports.atualizarDeveloper = atualizarDeveloper;
/**
 * @swagger
 * /api/desenvolvedores/{id}:
 *   delete:
 *     summary: Remove um desenvolvedor existente.
 *     tags:
 *      - Desenvolvedores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: ID do desenvolvedor a ser removido.
 *     responses:
 *       204:
 *         description: Desenvolvedor removido com sucesso.
 *       500:
 *         description: Falha ao remover desenvolvedor.
 */
const deletarDeveloper = async (req, res) => {
    try {
        const { id } = req.params;
        await developerService.deleteDeveloper(Number(id));
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Falha ao remover desenvolvedor.' });
    }
};
exports.deletarDeveloper = deletarDeveloper;
