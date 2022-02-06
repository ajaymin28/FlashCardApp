import React, { useState } from "react";
import "./NewFlashCard.css";

import NewFlashCardForm from "./NewFlashCardForm";


const NewFlashCard = (props) => {

    const [isEditing, setIsEditing] = useState(false);

    const onAddFlashCardHandler = () =>{
        setIsEditing(true);
    };
  
    const onCancelHandler = () =>{
        setIsEditing(false);
    };

    const saveFlashCardDataHandler = (data) =>{
        props.onAdd(data);
    }

    return (
    <div className="new-expense">
        {!isEditing && (<button className="AddNewFlashCardBtn" onClick={onAddFlashCardHandler}>Add New Flash Card</button>)} 
        {isEditing && (<NewFlashCardForm onSaveFlashCardData={saveFlashCardDataHandler} onCancel={onCancelHandler} />)}
    </div>
    );

};

export default NewFlashCard;