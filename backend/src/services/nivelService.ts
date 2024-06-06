import * as nivelModel from '../../../backend/src/models/nivelModel';

export const getAllNiveis = async (searchTerm?: string) => {
  try {
    const niveis = await nivelModel.getAllNiveis();
    return niveis;
  } catch (error: any) {
    throw new Error('Erro ao buscar níveis: ' + error.message);
  }
};

export const createNivel = async (nivelData: any) => {
  try {
    const novoNivel = await nivelModel.createNivel(nivelData.nivel);
    return novoNivel;
  } catch (error: any) {
    throw new Error('Erro ao criar nível: ' + error.message);
  }
};

export const updateNivel = async (id: number, nivelData: any) => {
  try {
    const nivelAtualizado = await nivelModel.updateNivel(id, nivelData.nivel);
    return nivelAtualizado;
  } catch (error: any) {
    throw new Error('Erro ao atualizar nível: ' + error.message);
  }
};

export const removerNivel = async (id: number) => {
  try {
    const nivelRemovido = await nivelModel.deleteNivel(id);
    return nivelRemovido;
  } catch (error: any) {
    throw new Error('Erro ao remover nível: ' + error.message);
  }
};
