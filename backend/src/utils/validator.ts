import { Request, Response, NextFunction } from 'express';

export const validateNivel = (req: Request, res: Response, next: NextFunction) => {
  const { nivel } = req.body;
  if (!nivel || typeof nivel !== 'string' || nivel.trim() === '') {
    return res.status(400).json({ error: 'O campo "nivel" é obrigatório e deve ser uma string não vazia.' });
  }
  next();
};

export const validateDeveloper = (req: Request, res: Response, next: NextFunction) => {
  const { nome, nivel_id, sexo, data_nascimento, hobby } = req.body;

  if (!nome || typeof nome !== 'string' || nome.trim() === '') {
    return res.status(400).json({ error: 'O campo "nome" é obrigatório e deve ser uma string não vazia.' });
  }

  if (!Number.isInteger(nivel_id)) {
    return res.status(400).json({ error: 'O campo "nivel_id" é obrigatório e deve ser um número inteiro.' });
  }

  if (!sexo || (sexo !== 'M' && sexo !== 'F')) {
    return res.status(400).json({ error: 'O campo "sexo" é obrigatório e deve ser "M" ou "F".' });
  }

  if (!data_nascimento || !Date.parse(data_nascimento)) {
    return res.status(400).json({ error: 'O campo "data_nascimento" é obrigatório e deve ser uma data válida.' });
  }

  if (!hobby || typeof hobby !== 'string' || hobby.trim() === '') {
    return res.status(400).json({ error: 'O campo "hobby" é obrigatório e deve ser uma string não vazia.' });
  }

  next();
};
