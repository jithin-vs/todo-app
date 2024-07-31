import React from "react";
import Button from '../Button/Button.jsx';
import "./Card.css";

const Card = ({id,title,description,onComplete,onDelete}) => {
  return (
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <div className=" card-bottom">
            <p className="card-description">{description}</p>
        <Button btnType='add' id={id} title={title}
          onClick={() => onComplete(id)} > Complete</Button> 
        <Button btnType='remove' id={id} title={title}
          onClick={() => onDelete(id)}>Delete</Button>
        </div>  
      </div>
  );
};

export default Card;