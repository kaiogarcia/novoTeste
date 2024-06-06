import axios from 'axios';

export const excluirNivel = async (id: number) => {
  try {
    await axios.delete(`http://localhost:4000/api/niveis/${id}`);
    console.log('Nível excluído com sucesso');
    return true; // Retorna true se a exclusão for bem-sucedida
  } catch (error) {
    console.error('Erro ao excluir nível:', error);
    return false; // Retorna false se houver erro na exclusão
  }
};
