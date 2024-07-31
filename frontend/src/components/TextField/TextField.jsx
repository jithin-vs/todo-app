import React, { useState } from 'react';
import './textField.css';

const TextField = ({ inputType, value, onChange, placeholder,children, ...rest }) => {
  return (
    <div className="form-group">
      <label className="form-label">
        {children}
      </label>
      <input
        type={inputType}
        value={value}
        onChange={(e) => onChange(e)}
        placeholder={placeholder}
        className="text-field"
        {...rest}
      />
    </div>
  );
};

export default TextField;
