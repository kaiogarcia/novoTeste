// ExibirErro.tsx
import React from 'react';

interface ExibirErroProps {
  error: string;
}

const ExibirErro: React.FC<ExibirErroProps> = ({ error }) => {
  return (
    <p className="error">{error}</p>
  );
};

export default ExibirErro;
