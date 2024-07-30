import React from 'react';
import './Button.css';

const AddToCartButton = ({handleLogin,children}) => {
  return (
    <button className="login-button" >
       {children}
    </button>
  );
};

export default AddToCartButton;
