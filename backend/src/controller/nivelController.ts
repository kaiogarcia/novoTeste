import { Request, Response } from 'express';
import * as nivelService from '../services/nivelService';
import { getAllNiveis } from '../services/nivelService'; 
// Importe a função para obter todos os níveis

// Simulando um banco de dados de níveis
let niveis: { id: number; nivel: string }[] = [];

/**
 * @swagger
 * /api/niveis:
 *   get:
 *     summary: Retorna a lista de níveis existentes.
 *     tags:
 *       - Níveis
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         description: Termo de pesquisa para filtrar os níveis.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resposta bem-sucedida
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Nivel'
 */
export const listarNiveis = async (req: Request, res: Response) => {
  try {
    // Obter parâmetros de consulta
    const { searchTerm } = req.query;
    
    // Convertendo searchTerm para string, se necessário
    const searchStr = typeof searchTerm === 'string' ? searchTerm : undefined;

    // Chamar o serviço para obter os níveis com base nos parâmetros de consulta
    const niveis = await getAllNiveis(searchStr);

    if (niveis.length === 0) {
      return res.status(404).json({ error: 'Nenhum nível encontrado.' });
    }

    res.json(niveis);
  } catch (error: any) {
    console.error('Erro ao listar níveis:', error);
    res.status(500).json({ error: 'Falha ao listar níveis.' });
  }
};


//----------------------------------------------------------------------------//

/**
 * @swagger
 * /api/niveis:
 *   post:
 *     summary: Cadastra um novo nível.
 *     tags:
 *       - Níveis
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nivel:
 *                 type: string
 *     responses:
 *       201:
 *         description: Nível cadastrado com sucesso.
 *       400:
 *         description: Nível é obrigatório.
 */
export const cadastrarNivel = async (req: Request, res: Response) => {
  try {
    const { nivel } = req.body;
    if (!nivel) {
      return res.status(400).json({ error: 'Nível é obrigatório.' });
    }
    const novoNivel = await nivelService.createNivel({ nivel });
    res.status(201).json(novoNivel);
  } catch (error) {
    console.error('Erro ao cadastrar nível:', error);
    res.status(500).json({ error: 'Falha ao cadastrar nível.' });
  }
};

//----------------------------------------------------------------------------//

/**
 * @swagger
 * /api/niveis/{id}:
 *   put:
 *     summary: Edita um nível existente.
 *     tags:
 *       - Níveis
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: ID do nível a ser editado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nivel:
 *                 type: string
 *     responses:
 *       200:
 *         description: Nível editado com sucesso.
 *       400:
 *         description: Nível é obrigatório.
 *       404:
 *         description: Nível não encontrado.
 */
export const editarNivel = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nivel } = req.body;

  try {
    // Verifica se o campo 'nivel' está presente no corpo da requisição
    if (!nivel) {
      return res.status(400).json({ error: 'Nível é obrigatório.' });
    }

    // Converte o ID de string para número
    const nivelId = parseInt(id);

    // Chama o serviço para atualizar o nível
    const nivelAtualizado = await nivelService.updateNivel(nivelId, { nivel });

    // Retorna o nível atualizado
    res.json(nivelAtualizado);
  } catch (error) {
    console.error('Erro ao editar nível:', error);
    res.status(500).json({ error: 'Falha ao editar nível.' });
  }
};


//----------------------------------------------------------------------------//

/**
 * @swagger
 * /api/niveis/{id}:
 *   delete:
 *     summary: Remove um nível existente.
 *     tags:
 *       - Níveis
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: ID do nível a ser removido.
 *     responses:
 *       204:
 *         description: Nível removido com sucesso.
 *       404:
 *         description: Nível não encontrado.
 */
export const removerNivel = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Chama o serviço para remover o nível
    await nivelService.removerNivel(parseInt(id));

    // Retorna uma resposta de sucesso
    res.status(204).send();
  } catch (error) {
    // Se ocorrer um erro ao remover o nível
    console.error('Erro ao remover nível:', error);
    res.status(500).json({ error: 'Falha ao remover nível.' });
  }
};


