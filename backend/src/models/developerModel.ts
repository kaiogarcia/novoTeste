import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllDevelopers = async () => {
  return prisma.developer.findMany({
    include: {
      nivel: true,
    },
  });
};

export const createDeveloper = async (developerData: {
  nivel_id: number;
  nome: string;
  sexo: string;
  data_nascimento: string;
  idade: number;
  hobby: string;
}) => {
  try {
    const { nivel_id, nome, sexo, data_nascimento, idade, hobby } = developerData;
    return await prisma.developer.create({
      data: {
        nivel_id,
        nome,
        sexo,
        data_nascimento: new Date(data_nascimento),
        idade,
        hobby,
      },
    });
  } catch (error) {
    console.error('Erro ao criar desenvolvedor no modelo:', error);
    throw error; // Propague o erro para que o serviço possa lidar com ele adequadamente
  }
};

export const updateDeveloper = async (id: number, developerData: Partial<{
  nivel_id?: number;
  nome?: string;
  sexo?: string;
  data_nascimento?: string;
  hobby?: string;
  idade?: number; // Incluído o campo idade
}>) => {
  const { nome, nivel_id, sexo, data_nascimento, hobby, idade } = developerData;
  return prisma.developer.update({
    where: { id },
    data: {
      nome,
      nivel_id,
      sexo,
      data_nascimento: data_nascimento ? new Date(data_nascimento) : undefined,
      hobby,
      idade,
    },
  });
};


export const deleteDeveloper = async (id: number) => {
  await prisma.developer.delete({
    where: { id },
  });
};
