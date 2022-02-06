import React, {useState} from "react";
import './FlashCardHolder.css';
import FlashCard from './FlashCard';

const FlashCardHolder = (props) =>{

    const [ActiveCardID, setActiveCardID] = useState("");

    if (props.flashcardslist.length === 0) {
        return <h2 className="expenses-list__fallback">No Words Found</h2>;
    }


    const onDeleteCardHandler = (event) =>{
        // alert(event.target.id);
        props.onCardDelete(event);
    }

    const onCardReviewChangeHandler = (event) =>{
        // alert(event.target.value);
        props.onCardReviewChangeDB(event);
    }

    const onCardFlipHandler = (event) =>{
        var elementID = event.target.id.split("_")[1];
        setActiveCardID(elementID);
        props.onCardFlipHandleDB(event);
    }
    
    return (
        <div className="flashCardHolderElement">
        {
            props.flashcardslist.map((flashCard)=>(
                <FlashCard cardViewScore={props.cardViewScore} ActiveCardid={ActiveCardID} flashcardDetails={flashCard} onCardFlip={onCardFlipHandler} onCardReviewStatusChange={onCardReviewChangeHandler} DeleteCardHandler={onDeleteCardHandler} key={flashCard.id} />
            ))
        }
        </div>
    );
}


export default FlashCardHolder;