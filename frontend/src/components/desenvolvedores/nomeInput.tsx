import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface NomeInputProps {
  nome: string;
  setNome: (nome: string) => void;
}

const NomeInput: React.FC<NomeInputProps> = ({ nome, setNome }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Verificar se o valor contém apenas números
    if (/^\d+$/.test(value)) {
      toast.error('O nome não pode conter apenas números.');
      return;
    }
    // Atualizar o estado do nome
    setNome(value);
  };

  return (
    <div className="form-group">
      <label htmlFor="nome">Nome:</label>
      <input
        type="text"
        id="nome"
        value={nome}
        onChange={handleChange}
        title="Por favor, insira letras e números."
        required
      />
    </div>
  );
};

export default NomeInput;
