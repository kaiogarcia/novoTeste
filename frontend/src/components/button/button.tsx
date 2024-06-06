import React, { ReactNode } from 'react';
import { toast, ToastContentProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './button.css'; // Importando o CSS dos botões

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  type?: 'edit' | 'delete' | 'save' | 'cancel'; // Adicionando tipos 'save' e 'cancel'
  className?: string; // Classe CSS opcional
}

const Button: React.FC<ButtonProps> = ({ onClick, children, type, className }) => {
  const buttonStyles: React.CSSProperties = {
    backgroundColor: type === 'edit' ? '#007bff' :
                     type === 'delete' ? '#dc3545' :
                     type === 'save' ? '#28a745' :
                     type === 'cancel' ? '#6c757d' : '#6c757d',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease',
    minWidth: '80px', // Adiciona um tamanho mínimo para os botões
    textAlign: 'center', // Garante que o texto esteja centralizado
    margin: '0 5px', // Adiciona margem para espaçamento entre botões
  };

  const handleDeleteClick = () => {
    toast.warning(
      ({ closeToast }: ToastContentProps) => (
        <div>
          <p>Deseja realmente excluir?</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <button 
              onClick={() => { onClick(); closeToast(); }} 
              style={{ cursor: 'pointer', backgroundColor:'#28a745', color: '#fff', padding: '0.3rem 0.5rem', border: 'none', borderRadius: '4px' }}
            >
              Sim
            </button>
            <button 
              onClick={closeToast} 
              style={{ cursor: 'pointer', backgroundColor: '#dc3545', color: '#fff', padding: '0.3rem 0.5rem', border: 'none', borderRadius: '4px' }}
            >
              Não
            </button>
          </div>
        </div>
      ),
      {
        position: 'top-right',
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
      }
    );
  };

  return (
    <button
      style={buttonStyles}
      onClick={type === 'delete' ? handleDeleteClick : onClick}
      className={className}
    >
      {children}
    </button>
  );
};

export default Button;
