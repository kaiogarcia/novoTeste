import { PrismaClient } from "@prisma/client";

// Defina uma interface para representar a estrutura de dados do modelo 'Nivel'
interface Nivel {
  id: number;
  nivel: string;
}

const prisma = new PrismaClient();

export const getAllNiveis = async (searchTerm?: string): Promise<Nivel[]> => {
  try {
    let niveis;

    if (searchTerm) {
      // Se houver um termo de pesquisa, filtre os níveis com base nele
      niveis = await prisma.nivel.findMany({
        where: {
          // Adicione as condições de filtro conforme necessário
          nivel: searchTerm
        }
      });
    } else {
      // Se não houver termo de pesquisa, retorne todos os níveis
      niveis = await prisma.nivel.findMany();
    }

    return niveis;
  } catch (error: any) {
    throw new Error('Erro ao buscar níveis: ' + error.message);
  }
};

export const createNivel = async (nivel: string): Promise<Nivel> => {
  const novoNivel = await prisma.nivel.create({
    data: { nivel },
  });
  return {
    id: novoNivel.id,
    nivel: novoNivel.nivel,
  };
};

export const updateNivel = async (id: number, nivel: string): Promise<Nivel> => {
  const nivelAtualizado = await prisma.nivel.update({
    where: { id },
    data: { nivel },
  });
  return {
    id: nivelAtualizado.id,
    nivel: nivelAtualizado.nivel,
  };
};

export const deleteNivel = async (id: number): Promise<void> => {
  // Verifique se há desenvolvedores associados a este nível
  const developersCount = await prisma.developer.count({
    where: { nivel_id: id },
  });
  if (developersCount > 0) {
    throw new Error('Existem desenvolvedores associados a este nível');
  }
  // Use a função 'delete' do Prisma Client para excluir um nível
  await prisma.nivel.delete({ where: { id } });
};
