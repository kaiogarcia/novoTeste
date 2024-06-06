import React from 'react';
import Button from '../button/button';

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

interface Props {
  developer: Developer;
  editedName: string;
  editedAge: number | null;
  editedHobby: string;
  editedSexo: string;
  editedDataNascimento: string;
  editedNivel: Nivel;
  setEditedName: React.Dispatch<React.SetStateAction<string>>;
  setEditedAge: React.Dispatch<React.SetStateAction<number | null>>;
  setEditedHobby: React.Dispatch<React.SetStateAction<string>>;
  setEditedSexo: React.Dispatch<React.SetStateAction<string>>;
  setEditedDataNascimento: React.Dispatch<React.SetStateAction<string>>;
  setEditedNivel: React.Dispatch<React.SetStateAction<Nivel>>;
  handleSalvarEdicao: (developer: Developer) => void;
  handleCancelarEdicao: () => void;
}

const EditarDeveloper: React.FC<Props> = ({
  developer,
  editedName,
  editedAge,
  editedHobby,
  editedSexo,
  editedDataNascimento,
  editedNivel,
  setEditedName,
  setEditedAge,
  setEditedHobby,
  setEditedSexo,
  setEditedDataNascimento,
  setEditedNivel,
  handleSalvarEdicao,
  handleCancelarEdicao,
}) => {
  return (
    <tr>
      <td data-label="Nome">
        <input
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
        />
      </td>
      <td data-label="Idade">
        <input
          type="number"
          value={editedAge !== null ? editedAge : ''}
          onChange={(e) => setEditedAge(parseInt(e.target.value))}
        />
      </td>
      <td data-label="Nível">
        <input
          type="text"
          value={editedNivel.nivel}
          onChange={(e) => setEditedNivel({ ...editedNivel, nivel: e.target.value })}
          disabled
        />
      </td>
      <td data-label="Hobby">
        <input
          type="text"
          value={editedHobby}
          onChange={(e) => setEditedHobby(e.target.value)}
        />
      </td>
      <td data-label="Sexo">
        <input
          type="text"
          value={editedSexo}
          onChange={(e) => setEditedSexo(e.target.value)}
        />
      </td>
      <td data-label="Data de Nascimento">
        <input
          type="date"
          value={editedDataNascimento}
          onChange={(e) => setEditedDataNascimento(e.target.value)}
        />
      </td>
      <td data-label="Ações" className="actions">
        <Button onClick={() => handleSalvarEdicao(developer)} type="save">Salvar</Button>
        <Button onClick={handleCancelarEdicao} type="cancel">Cancelar</Button>
      </td>
    </tr>
  );
};

export default EditarDeveloper;
