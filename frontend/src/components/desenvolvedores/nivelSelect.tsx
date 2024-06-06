// NivelSelect.tsx
import React from 'react';

interface Nivel {
  id: number;
  nome: string;
}

interface NivelSelectProps {
  nivelId: string;
  setNivelId: (nivelId: string) => void;
  niveis: Nivel[];
}

const NivelSelect: React.FC<NivelSelectProps> = ({ nivelId, setNivelId, niveis }) => {
  return (
    <div className="custom-input-container">
      <label htmlFor="nivel">Nível:</label>
      <select id="nivel" value={nivelId} onChange={(event) => setNivelId(event.target.value)}>
        <option value="">Selecione um nível</option>
        {niveis.map((nivel) => (
          <option key={nivel.id} value={nivel.id.toString()}>{nivel.nome}</option>
        ))}
      </select>
    </div>
  );
};

export default NivelSelect;
