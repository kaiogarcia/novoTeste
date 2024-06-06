// routes.tsx
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NiveisListagem from './components/niveis/niveisListagem';
import NiveisCadastro from './components/niveis/niveisCadastro';
//import NiveisEdicao from './components/niveis/niveisEdicao';
//import NiveisRemocao from './components/niveis/niveisRemocao';
import DesenvolvedoresListagem from './components/desenvolvedores/devListagem';
import DesenvolvedoresCadastro from './components/desenvolvedores/devCadastro';
//import DesenvolvedoresEdicao from './components/desenvolvedores/devEdicao';
//import DesenvolvedoresRemocao from './components/desenvolvedores/pages/devRemocao';


const Routes: React.FC = () => {
  return (
    <Router>
      <Route path="/niveis" Component={NiveisListagem} />
      <Route path="/niveis/cadastro" Component={NiveisCadastro} />
      <Route path="/desenvolvedores" Component={DesenvolvedoresListagem} />
      <Route path="/desenvolvedores/cadastro" Component={DesenvolvedoresCadastro} />
    </Router>
  );
};

export default Routes;