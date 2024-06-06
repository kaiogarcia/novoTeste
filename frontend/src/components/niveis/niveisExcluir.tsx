import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '../button/button';

interface Nivel {
  id: number;
  nivel: string;
  developerCount: number;
}

interface Props {
  id: number;
  setNiveis: React.Dispatch<React.SetStateAction<Nivel[]>>;
  niveis: Nivel[];
}

const ExcluirNivel: React.FC<Props> = ({ id, setNiveis, niveis }) => {
  const handleExcluir = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/niveis/${id}`);
      setNiveis(niveis.filter((nivel) => nivel.id !== id));
    } catch (error: any) {
      if (error.response && error.response.status === 500) {
        toast.error('Existem desenvolvedores associados a este nível. Não é possível excluí-lo!');
      } else {
        console.error('Erro ao excluir nível!', error);
      }
    }
  };

  return (
    <Button onClick={handleExcluir} type="delete">Excluir</Button>
  );
};

export default ExcluirNivel;
