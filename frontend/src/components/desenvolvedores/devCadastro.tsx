// DesenvolvedoresCadastro.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NomeInput from './nomeInput';
import SexoInput from './sexoInput';
import DataNascimentoInput from './dtNascInput';
import HobbyInput from './hobbyInput';
import NivelSelect from './nivelSelect';
import '../../assets/desenvolvedores/devCadastro.css'; // Importando o arquivo CSS

interface Nivel {
  id: number;
  nome: string;
}

const DesenvolvedoresCadastro: React.FC = () => {
  const [nome, setNome] = useState('');
  const [sexo, setSexo] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [hobby, setHobby] = useState('');
  const [nivelId, setNivelId] = useState('');
  const [niveis, setNiveis] = useState<Nivel[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNiveis = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/niveis');
        const niveisData: Nivel[] = response.data.map((nivel: { id: number, nivel: string }) => ({
          id: nivel.id,
          nome: nivel.nivel
        }));
        setNiveis(niveisData);
      } catch (error) {
        console.error('Erro ao buscar níveis:', error);
      }
    };

    fetchNiveis();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!nome.trim() || !sexo.trim() || !dataNascimento.trim() || !hobby.trim() || !nivelId.trim()) {
      setError('É necessário preencher todos os campos.');
      toast.error('É necessário preencher todos os campos.');
      return;
    }

    if (isNaN(parseInt(nivelId))) {
      setError('O ID do nível deve ser um número.');
      return;
    }

    try {
      await axios.post('http://localhost:4000/api/desenvolvedores', {
        nivel_id: parseInt(nivelId),
        nome,
        sexo,
        data_nascimento: dataNascimento,
        hobby,
      });

      toast.success('Cadastro realizado com sucesso!');
      setNome('');
      setSexo('');
      setDataNascimento('');
      setHobby('');
      setNivelId('');
      setError('');
    } catch (error) {
      console.error('Erro ao cadastrar desenvolvedor:', error);
      toast.error('Erro ao cadastrar desenvolvedor. Por favor, tente novamente mais tarde.');
    }
  };

  return (
    <div className="form-container">
      <h2>Cadastro de Desenvolvedores</h2>
      <form onSubmit={handleSubmit}>
        <NomeInput nome={nome} setNome={setNome} />
        <SexoInput sexo={sexo} setSexo={setSexo} />
        <DataNascimentoInput dataNascimento={dataNascimento} setDataNascimento={setDataNascimento} />
        <HobbyInput hobby={hobby} setHobby={setHobby} />
        <NivelSelect nivelId={nivelId} setNivelId={setNivelId} niveis={niveis} />
        {error && <p className="error">{error}</p>}
        <button type="submit">Cadastrar</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default DesenvolvedoresCadastro;
