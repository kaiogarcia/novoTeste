import * as developerModel from '../../../backend/src/models/developerModel';

export const getAllDevelopers = async () => {
  return developerModel.getAllDevelopers();
};

export const createDeveloper = async (developerData: {
  nivel_id: number;
  nome: string;
  sexo: string;
  data_nascimento: string;
  hobby: string;
}) => {
  try {
    const { nivel_id, nome, sexo, data_nascimento, hobby } = developerData;
    const idade = new Date().getFullYear() - new Date(data_nascimento).getFullYear();
    return await developerModel.createDeveloper({ nome, nivel_id, sexo, data_nascimento, idade, hobby });
  } catch (error) {
    console.error('Erro ao criar desenvolvedor no serviço:', error);
    throw error; // Propague o erro para que o controlador possa lidar com ele adequadamente
  }
};

export const updateDeveloper = async (id: number, developerData: Partial<{
  nivel_id?: number;
  nome?: string;
  sexo?: string;
  data_nascimento?: string;
  hobby?: string;
}>) => {
  const { nome, nivel_id, sexo, data_nascimento, hobby } = developerData;
  let idadeCalculada;
  if (data_nascimento) {
    const birthDate = new Date(data_nascimento);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    idadeCalculada = age;
  }
  return developerModel.updateDeveloper(id, { nome, nivel_id, sexo, data_nascimento, hobby, idade: idadeCalculada });
};


export const deleteDeveloper = async (id: number) => {
  return developerModel.deleteDeveloper(id);
};
