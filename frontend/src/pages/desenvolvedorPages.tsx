import React, { useState } from 'react';

interface Desenvolvedor {
  id: number;
  nome: string;
  cargo: string;
}

const DesenvolvedoresPage: React.FC = () => {
  const [desenvolvedores, setDesenvolvedores] = useState<Desenvolvedor[]>([]);
  const [novoDesenvolvedor, setNovoDesenvolvedor] = useState<string>('');
  const [novoCargo, setNovoCargo] = useState<string>('');
  const [editando, setEditando] = useState<boolean>(false);
  const [desenvolvedorEditando, setDesenvolvedorEditando] = useState<Desenvolvedor | null>(null);

  const handleAddDesenvolvedor = () => {
    if (novoDesenvolvedor.trim() !== '' && novoCargo.trim() !== '') {
      const novoId = desenvolvedores.length + 1;
      const novoItem: Desenvolvedor = { id: novoId, nome: novoDesenvolvedor, cargo: novoCargo };
      setDesenvolvedores([...desenvolvedores, novoItem]);
      setNovoDesenvolvedor('');
      setNovoCargo('');
    }
  };

  const handleEditDesenvolvedor = (desenvolvedor: Desenvolvedor) => {
    setEditando(true);
    setDesenvolvedorEditando(desenvolvedor);
    setNovoDesenvolvedor(desenvolvedor.nome);
    setNovoCargo(desenvolvedor.cargo);
  };

  const handleSaveEdit = () => {
    if (desenvolvedorEditando) {
      const desenvolvedoresAtualizados = desenvolvedores.map((desenvolvedor) =>
        desenvolvedor.id === desenvolvedorEditando.id
          ? { ...desenvolvedor, nome: novoDesenvolvedor, cargo: novoCargo }
          : desenvolvedor
      );
      setDesenvolvedores(desenvolvedoresAtualizados);
      setEditando(false);
      setDesenvolvedorEditando(null);
      setNovoDesenvolvedor('');
      setNovoCargo('');
    }
  };

  const handleDeleteDesenvolvedor = (desenvolvedor: Desenvolvedor) => {
    if (window.confirm(`Tem certeza que deseja excluir o desenvolvedor "${desenvolvedor.nome}"?`)) {
      const desenvolvedoresFiltrados = desenvolvedores.filter((item) => item.id !== desenvolvedor.id);
      setDesenvolvedores(desenvolvedoresFiltrados);
    }
  };

  return (
    <div>
      <h1>Desenvolvedores</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Cargo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {desenvolvedores.map((desenvolvedor) => (
            <tr key={desenvolvedor.id}>
              <td>{desenvolvedor.id}</td>
              <td>{desenvolvedor.nome}</td>
              <td>{desenvolvedor.cargo}</td>
              <td>
                <button onClick={() => handleEditDesenvolvedor(desenvolvedor)}>Editar</button>
                <button onClick={() => handleDeleteDesenvolvedor(desenvolvedor)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {editando ? (
          <>
            <input
              type="text"
              value={novoDesenvolvedor}
              onChange={(e) => setNovoDesenvolvedor(e.target.value)}
            />
            <input
              type="text"
              value={novoCargo}
              onChange={(e) => setNovoCargo(e.target.value)}
            />
            <button onClick={handleSaveEdit}>Salvar</button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Nome do Desenvolvedor"
              value={novoDesenvolvedor}
              onChange={(e) => setNovoDesenvolvedor(e.target.value)}
            />
            <input
              type="text"
              placeholder="Cargo"
              value={novoCargo}
              onChange={(e) => setNovoCargo(e.target.value)}
            />
            <button onClick={handleAddDesenvolvedor}>Adicionar</button>
          </>
        )}
      </div>
    </div>
  );
};

export default DesenvolvedoresPage;
