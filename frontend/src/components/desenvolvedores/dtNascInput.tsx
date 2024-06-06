// DataNascimentoInput.tsx
import React from 'react';

interface DataNascimentoInputProps {
  dataNascimento: string;
  setDataNascimento: (dataNascimento: string) => void;
}

const DataNascimentoInput: React.FC<DataNascimentoInputProps> = ({ dataNascimento, setDataNascimento }) => {
  return (
    <div className="custom-input-container">
      <label htmlFor="dataNascimento">Data de Nascimento:</label>
      <input
        type="date"
        id="dataNascimento"
        value={dataNascimento}
        onChange={(event) => setDataNascimento(event.target.value)}
      />
    </div>
  );
};

export default DataNascimentoInput;
