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
  newName: string;
  setNewName: React.Dispatch<React.SetStateAction<string>>;
  setEditingId: React.Dispatch<React.SetStateAction<number | null>>;
  setNiveis: React.Dispatch<React.SetStateAction<Nivel[]>>;
  niveis: Nivel[];
}

const EditarNivel: React.FC<Props> = ({ id, newName, setNewName, setEditingId, setNiveis, niveis }) => {
  const handleSalvar = async () => {
    if (!newName.trim()) {
      toast.error('Por favor, preencha o campo!');
      return;
    }

    if (/^\d+$/.test(newName)) {
      toast.error('O campo não permite somente números!');
      return;
    }

    try {
      await axios.put(`http://localhost:4000/api/niveis/${id}`, { nivel: newName });
      const updatedNiveis = niveis.map((nivel) =>
        nivel.id === id ? { ...nivel, nivel: newName } : nivel
      );
      setNiveis(updatedNiveis);
      setEditingId(null);
      toast.success('Nível atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar nível!', error);
    }
  };

  return (
    <>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <Button onClick={handleSalvar} type="save" className="save-button">Salvar</Button>
    </>
  );
};

export default EditarNivel;
