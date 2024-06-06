import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaPlus, FaList } from 'react-icons/fa';
import NiveisListagem from './components/niveis/niveisListagem';
import NiveisCadastro from './components/niveis/niveisCadastro';
//import NiveisEdicao from './components/niveis/niveisEdicao';
//import NiveisRemocao from './components/niveis/niveisRemocao';
import DesenvolvedoresListagem from './components/desenvolvedores/devListagem';
import DesenvolvedoresCadastro from './components/desenvolvedores/devCadastro';
//import DesenvolvedoresEdicao from './components/desenvolvedores/devEdicao';

import '../src/assets/app.css'; // Importando o arquivo CSS

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'niveis' | 'desenvolvedores'>('niveis');
  const [showNiveis, setShowNiveis] = useState<'listagem' | 'cadastro'>('listagem');
  const [showDevs, setShowDevs] = useState<'listagem' | 'cadastro'>('listagem');

  return (
    <Router>
      <div className="app">
        <header>
          <h1>Gerenciador de Níveis e Desenvolvedores</h1>
          <nav>
            <Link to="#" onClick={() => setActiveSection('niveis')}>Níveis</Link>
            <Link to="#" onClick={() => setActiveSection('desenvolvedores')}>Desenvolvedores</Link>
          </nav>
        </header>

        {activeSection === 'niveis' && (
          <div className="section">
            <h2>Níveis</h2>
            <div className="buttons">
              <button onClick={() => setShowNiveis('cadastro')}>
                <FaPlus /> Cadastrar Nível
              </button>
              <button onClick={() => setShowNiveis('listagem')}>
                <FaList /> Listar Níveis
              </button>
            </div>
            <div className="content">
              {showNiveis === 'listagem' && <NiveisListagem />}
              {showNiveis === 'cadastro' && <NiveisCadastro />}
            </div>
          </div>
        )}

        {activeSection === 'desenvolvedores' && (
          <div className="section">
            <h2>Desenvolvedores</h2>
            <div className="buttons">
              <button onClick={() => setShowDevs('cadastro')}>
                <FaPlus /> Cadastrar Desenvolvedor
              </button>
              <button onClick={() => setShowDevs('listagem')}>
                <FaList /> Listar Desenvolvedores
              </button>
            </div>
            <div className="content">
              {showDevs === 'listagem' && <DesenvolvedoresListagem />}
              {showDevs === 'cadastro' && <DesenvolvedoresCadastro />}
            </div>
          </div>
        )}

        <footer className="footer">
          &copy; {new Date().getFullYear()} Gerenciador de Níveis e Desenvolvedores. Todos os direitos reservados.
        </footer>
      </div>
    </Router>
  );
};

export default App;
