// SexoInput.tsx
import React from 'react';

interface SexoInputProps {
  sexo: string;
  setSexo: (sexo: string) => void;
}

const SexoInput: React.FC<SexoInputProps> = ({ sexo, setSexo }) => {
  return (
    <div className="custom-input-container">
      <label>Sexo:</label>
      <div>
        <input
          type="radio"
          id="M"
          name="sexo"
          value="M"
          checked={sexo === 'M'}
          onChange={(event) => setSexo(event.target.value)}
        />
        <label htmlFor="masculino">Masculino</label>
      </div>
      <div>
        <input
          type="radio"
          id="F"
          name="sexo"
          value="F"
          checked={sexo === 'F'}
          onChange={(event) => setSexo(event.target.value)}
        />
        <label htmlFor="feminino">Feminino</label>
      </div>
    </div>
  );
};

export default SexoInput;
