import React, { useState } from 'react';
import Button from '../button/button';
import EditarNivel from './niveisEditar';
import ExcluirNivel from './niveisExcluir';

interface Nivel {
  id: number;
  nivel: string;
  developerCount: number;
}

interface Props {
  nivel: Nivel;
  setNiveis: React.Dispatch<React.SetStateAction<Nivel[]>>;
  niveis: Nivel[];
}

const NivelItem: React.FC<Props> = ({ nivel, setNiveis, niveis }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newName, setNewName] = useState<string>('');

  const handleEditar = () => {
    setEditingId(nivel.id);
    setNewName(nivel.nivel);
  };

  return (
    <li className="nivel-item">
      <div className="nivel-content">
        {editingId === nivel.id ? (
          <EditarNivel
            id={nivel.id}
            newName={newName}
            setNewName={setNewName}
            setEditingId={setEditingId}
            setNiveis={setNiveis}
            niveis={niveis}
          />
        ) : (
          <span className="nivel-nome">{nivel.nivel}</span>
        )}
        <span className="developer-count">{nivel.developerCount}</span>
        <div className="buttons-container">
          {editingId === nivel.id ? (
            <>
              <Button onClick={() => setEditingId(null)} type="cancel" className="cancel-button">Cancelar</Button>
            </>
          ) : (
            <>
              <Button onClick={handleEditar} type="edit">Editar</Button>
              <ExcluirNivel id={nivel.id} setNiveis={setNiveis} niveis={niveis} />
            </>
          )}
        </div>
      </div>
    </li>
  );
};

export default NivelItem;
