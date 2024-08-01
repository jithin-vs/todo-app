import React from 'react';
import Button from '../Button/Button'; // Make sure to import the Button component
import './Card.css';

const Card = ({ id, title, description, onDelete }) => {
  return (
    <div className="card-body">
      <h3 className="card-title">{title}</h3>
      <div className="card-bottom">
        <p className="card-description">{description}</p>
        <Button btnType='remove' onClick={() => onDelete(id)}>Delete</Button>
      </div>
    </div>
  );
};

export default Card;
