// src/components/NiveisPage.tsx
import React, { useState } from 'react';
import { Table, TableHead, TableBody, TableCell, TableRow, Button, Modal, TextField } from '@mui/material';

interface Nivel {
  id: number;
  nome: string;
}

const NiveisPage: React.FC = () => {
  const [niveis, setNiveis] = useState<Nivel[]>([]);
  const [novoNivel, setNovoNivel] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleAddNivel = () => {
    if (novoNivel.trim() !== '') {
      const novoId = niveis.length + 1;
      const novoItem: Nivel = { id: novoId, nome: novoNivel };
      setNiveis([...niveis, novoItem]);
      setNovoNivel('');
      setModalOpen(false);
    }
  };

  const handleDeleteNivel = (nivel: Nivel) => {
    if (window.confirm(`Tem certeza que deseja excluir o nível "${nivel.nome}"?`)) {
      const niveisFiltrados = niveis.filter((item) => item.id !== nivel.id);
      setNiveis(niveisFiltrados);
    }
  };

  return (
    <div>
      <h1>Níveis</h1>
      <Button onClick={() => setModalOpen(true)}>Adicionar Nível</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {niveis.map((nivel) => (
            <TableRow key={nivel.id}>
              <TableCell>{nivel.id}</TableCell>
              <TableCell>{nivel.nome}</TableCell>
              <TableCell>
                <Button>Edit</Button>
                <Button onClick={() => handleDeleteNivel(nivel)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div>
          <h2>Novo Nível</h2>
          <TextField
            label="Nome"
            value={novoNivel}
            onChange={(e) => setNovoNivel(e.target.value)}
          />
          <Button onClick={handleAddNivel}>Adicionar</Button>
        </div>
      </Modal>
    </div>
  );
};

export default NiveisPage;
