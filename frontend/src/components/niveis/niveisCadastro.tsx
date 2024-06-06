import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/niveis/niveisCadastro.css';
import Formulario from './formularioNiveis';
import CampoInput from './inputNiveis';
import ExibirErro from './erroNiveis';

const API_URL = 'http://localhost:4000/api/niveis';

const NiveisCadastro: React.FC = () => {
  const [nome, setNome] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!validateNome()) {
      return;
    }

    try {
      await axios.post(API_URL, { nivel: nome });
      handleSuccess();
    } catch (error) {
      handleError();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value);
    setError('');
  };

  const validateNome = () => {
    if (!nome.trim()) {
      toast.error('Por favor, preencha o campo Nome.');
      return false;
    }

    const regex = /^(?=.*[A-Za-z])[A-Za-z0-9\s]+$/;
    if (!regex.test(nome)) {
      setError('O nome deve conter letras e pode conter números e espaços, mas não apenas números.');
      return false;
    }

    return true;
  };

  const handleSuccess = () => {
    toast.success('Cadastro realizado com sucesso!');
    setNome('');
  };

  const handleError = () => {
    toast.error('Erro ao cadastrar nível. Por favor, tente novamente mais tarde.');
  };

  return (
    <div className="form-container">
      <h2>Cadastro de Níveis</h2>
      <Formulario onSubmit={handleSubmit}>
        <CampoInput
          id="nome"
          label="Nome:"
          value={nome}
          onChange={handleChange}
          pattern="^(?=.*[A-Za-z])[A-Za-z0-9\s]+$"
          title="Por favor, insira letras e pode conter números e espaços, mas não apenas números."
          required
        />
        {error && <ExibirErro error={error} />}
        <div className="button-container">
          <button type="submit">Cadastrar</button>
        </div>
      </Formulario>
      <ToastContainer />
    </div>
  );
};

export default NiveisCadastro;
