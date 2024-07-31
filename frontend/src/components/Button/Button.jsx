import React from 'react';
import './Button.css';

const Button = ({btnType,children,...rest}) => {
 if (btnType === 'submit') {
   return (
     <button className="submit-button" {...rest} >
      {children}
     </button>
   )
  }
  if (btnType === 'add') {
    return(
    <button className="add-button" {...rest} >
      {children}
      </button>
    )
  }
  if (btnType === 'remove') {
    return(
    <button className="remove-button" {...rest}>
      {children}
      </button>
    )
  }
  if (btnType === 'new-task-btn') {
   return(
    <button className="new-todo-button" {...rest}>
      {children}
      </button>
   )
 }
};

export default Button;
