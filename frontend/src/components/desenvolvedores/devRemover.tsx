import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '../button/button';

interface Developer {
  id: number;
  nome: string;
  idade: number;
  nivel: {
    id: number;
    nivel: string;
  };
  hobby: string;
  sexo: string;
  data_nascimento: string;
}

interface Props {
  developer: Developer;
  setDevelopers: React.Dispatch<React.SetStateAction<Developer[]>>;
  developers: Developer[];
}

const RemoverDeveloper: React.FC<Props> = ({ developer, setDevelopers, developers }) => {
  const handleRemocao = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/desenvolvedores/${developer.id}`);
      console.log('Desenvolvedor removido com sucesso');
      setDevelopers(developers.filter((dev) => dev.id !== developer.id));
      toast.success('Desenvolvedor removido com sucesso');
    } catch (error) {
      console.error('Erro ao remover desenvolvedor:', error);
      toast.error('Erro ao remover desenvolvedor');
    }
  };

  return (
    <Button onClick={handleRemocao} type="delete">Excluir</Button>
  );
};

export default RemoverDeveloper;
