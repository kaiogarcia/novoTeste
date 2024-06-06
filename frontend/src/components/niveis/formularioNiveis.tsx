// Formulario.tsx
import React from 'react';

interface FormularioProps {
  onSubmit: () => void;
  children?: React.ReactNode;
}

const Formulario: React.FC<FormularioProps> = ({ onSubmit, children }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

export default Formulario;
