import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Acesso negado' });
  }
  try {
    // Verifique o token aqui (ex: usando jwt)
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};
