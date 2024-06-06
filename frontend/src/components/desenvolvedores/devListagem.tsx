import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditarDeveloper from './devEditar';
import RemoverDeveloper from './devRemover';
import Button from '../button/button';
import '../../assets/desenvolvedores/devListagem.css';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Nivel {
  id: number;
  nivel: string;
}

interface Developer {
  id: number;
  nome: string;
  idade: number;
  nivel: Nivel;
  hobby: string;
  sexo: string;
  data_nascimento: string;
}

const formatarData = (data: string): string => {
  const dataUTC = new Date(data);
  const dataLocal = new Date(dataUTC.getTime() + dataUTC.getTimezoneOffset() * 60000); // Adiciona a diferença de fuso horário
  return format(dataLocal, 'dd/MM/yyyy', { locale: ptBR });
};



const DesenvolvedoresListagem: React.FC = () => {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [editingDeveloper, setEditingDeveloper] = useState<Developer | null>(null);
  const [editedName, setEditedName] = useState<string>('');
  const [editedAge, setEditedAge] = useState<number | null>(null);
  const [editedHobby, setEditedHobby] = useState<string>('');
  const [editedSexo, setEditedSexo] = useState<string>('');
  const [editedDataNascimento, setEditedDataNascimento] = useState<string>('');
  const [editedNivel, setEditedNivel] = useState<Nivel>({ id: 0, nivel: '' });

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/desenvolvedores');
        setDevelopers(response.data);
      } catch (error) {
        console.error('Erro ao buscar desenvolvedores:', error);
      }
    };

    fetchDevelopers();
  }, []);

  const handleEditar = (developer: Developer) => {
    setEditingDeveloper(developer);
    setEditedName(developer.nome);
    setEditedAge(developer.idade);
    setEditedHobby(developer.hobby);
    setEditedSexo(developer.sexo);
    setEditedDataNascimento(developer.data_nascimento);
    setEditedNivel({ id: developer.nivel.id, nivel: developer.nivel.nivel });
  };

  const handleCancelarEdicao = () => {
    setEditingDeveloper(null);
    setEditedName('');
    setEditedAge(null);
    setEditedHobby('');
    setEditedSexo('');
    setEditedDataNascimento('');
    setEditedNivel({ id: 0, nivel: '' });
  };

  const isFieldEmpty = (field: any) => !field;
  const isOnlyNumbers = (field: string) => /^\d+$/.test(field);
  
  const validateFields = () => {
    const fields = [
      { value: editedName, message: 'Todos os campos devem ser preenchidos' },
      { value: editedAge, message: 'Todos os campos devem ser preenchidos' },
      { value: editedHobby, message: 'Todos os campos devem ser preenchidos' },
      { value: editedSexo, message: 'Todos os campos devem ser preenchidos' },
      { value: editedDataNascimento, message: 'Todos os campos devem ser preenchidos' },
      { value: editedNivel.nivel, message: 'Todos os campos devem ser preenchidos' }
    ];
  
    for (const field of fields) {
      if (isFieldEmpty(field.value)) {
        toast.error(field.message);
        return false;
      }
    }
  
    const invalidFields = [
      { value: editedName, message: 'O campo nome não pode conter apenas números' },
      { value: editedHobby, message: 'O campo hobby não pode conter apenas números' },
      { value: editedSexo, message: 'O campo sexo só pertimite que insira M ou F!'}
    ];
  
    for (const field of invalidFields) {
      if (isOnlyNumbers(field.value)) {
        toast.error(field.message);
        return false;
      }
    }
  
    return true;
  };
  
  const handleSalvarEdicao = async (developer: Developer) => {
    if (!validateFields()) return;
  
    const updatedDeveloper = {
      nome: editedName,
      idade: editedAge,
      hobby: editedHobby,
      sexo: editedSexo,
      data_nascimento: editedDataNascimento,
      nivel_id: editedNivel.id,
    };
  
    try {
      await axios.put(`http://localhost:4000/api/desenvolvedores/${developer.id}`, updatedDeveloper);
      toast.success('Desenvolvedor atualizado com sucesso');
      setEditingDeveloper(null);
    } catch (error) {
      console.error('Erro ao atualizar desenvolvedor:', error);
      toast.error('Erro ao atualizar desenvolvedor');
    }
  };
  
  

  return (
    <div className="list-container">
      <h2>Listagem de Desenvolvedores</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Nível</th>
            <th>Hobby</th>
            <th>Sexo</th>
            <th>Data de Nascimento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
  {developers.map((developer) => (
    editingDeveloper?.id === developer.id ? (
      <EditarDeveloper
        key={developer.id}
        developer={developer}
        editedName={editedName}
        editedAge={editedAge}
        editedHobby={editedHobby}
        editedSexo={editedSexo}
        editedDataNascimento={editedDataNascimento}
        editedNivel={editedNivel}
        setEditedName={setEditedName}
        setEditedAge={setEditedAge}
        setEditedHobby={setEditedHobby}
        setEditedSexo={setEditedSexo}
        setEditedDataNascimento={setEditedDataNascimento}
        setEditedNivel={setEditedNivel}
        handleSalvarEdicao={handleSalvarEdicao}
        handleCancelarEdicao={handleCancelarEdicao}
      />
    ) : (
      <tr key={developer.id}>
        <td data-label="Nome"><div className="cell-content">{developer.nome}</div></td>
        <td data-label="Idade"><div className="cell-content">{developer.idade} anos</div></td>
        <td data-label="Nível"><div className="cell-content">{developer.nivel.nivel}</div></td>
        <td data-label="Hobby"><div className="cell-content">{developer.hobby}</div></td>
        <td data-label="Sexo"><div className="cell-content">{developer.sexo}</div></td>
        <td data-label="Data de Nascimento"><div className="cell-content">{formatarData(developer.data_nascimento)}</div></td>
        <td data-label="Ações">
          <Button onClick={() => handleEditar(developer)} type="edit">Editar</Button>
          <RemoverDeveloper developer={developer} setDevelopers={setDevelopers} developers={developers} />
        </td>
      </tr>
    )
  ))}
</tbody>

      </table>
      <ToastContainer />
    </div>
  );  
  
};

export default DesenvolvedoresListagem;