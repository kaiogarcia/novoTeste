import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface HobbyInputProps {
  hobby: string;
  setHobby: (hobby: string) => void;
}

const HobbyInput: React.FC<HobbyInputProps> = ({ hobby, setHobby }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Verificar se o valor contém apenas números
    if (/^\d+$/.test(value)) {
      toast.error('O hobby não pode conter apenas números.');
      return;
    }
    // Atualizar o estado do hobby
    setHobby(value);
  };

  return (
    <div className="form-group">
      <label htmlFor="hobby">Hobby:</label>
      <input
        type="text"
        id="hobby"
        value={hobby}
        onChange={handleChange}
        title="Por favor, insira letras e números."
        required
      />
    </div>
  );
};

export default HobbyInput;
