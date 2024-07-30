import React, { useState } from 'react';
import './textField.css'

const TextField = ({ inputType,onChange, children}) => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
        onChange(e.target.value);
    };
    
    return (
        <div className="form-group">
          <label className="form-label">
            {children}
          </label>
          <input
            type={inputType}
            value={value}
            onChange={handleChange}
            required
          />
        </div>
      );
    return null;
};

export default TextField;
