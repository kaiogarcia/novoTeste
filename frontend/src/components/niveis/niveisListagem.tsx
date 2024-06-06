import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../button/button';
import '../../assets/niveis/niveisListagem.css'; // Importando o CSS da listagem de níveis
import NivelItem from './niveisItem';

interface Nivel {
  id: number;
  nivel: string;
  developerCount: number;
}

const NiveisListagem: React.FC = () => {
  const [niveis, setNiveis] = useState<Nivel[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchNiveis = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/niveis');
        setNiveis(response.data);
      } catch (error) {
        handleRequestError(error as AxiosError);
      }
    };

    fetchNiveis();
  }, []);

  const handleRequestError = (error: AxiosError<any>) => {
    if (error.response && error.response.data && error.response.data.message) {
      setError(error.response.data.message);
    } else {
      console.error('Erro ao buscar níveis:', error);
    }
  };

  return (
    <div className="niveis-listagem">
      <ToastContainer />
      <h2>Listagem de Níveis</h2>
      {error && <p>{error}</p>}
      <ul>
        {niveis.map((nivel) => (
          <NivelItem key={nivel.id} nivel={nivel} setNiveis={setNiveis} niveis={niveis} />
        ))}
      </ul>
    </div>
  );
};

export default NiveisListagem;
