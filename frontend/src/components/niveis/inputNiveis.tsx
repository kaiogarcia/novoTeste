// CampoInput.tsx
import React from 'react';

interface CampoInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  pattern: string;
  title: string;
  required: boolean;
}

const   CampoInput: React.FC<CampoInputProps> = ({ id, label, value, onChange, pattern, title, required }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        pattern={pattern}
        title={title}
        required={required}
      />
    </div>
  );
};

export default CampoInput;
