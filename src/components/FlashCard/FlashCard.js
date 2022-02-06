import React, { useState } from "react";
import './FlashCard.css';


const FlashCard = (props) =>{

   var CardStatus = "Reviewing";
   if(props.flashcardDetails.Mastered){
      CardStatus = "Mastered"
   }

   // const [isFlipped, setIsFlipped] = useState(false);
   const [isMastered, setMastered] = useState(CardStatus);

   const FlipThisCard = (event) =>{
      props.onCardFlip(event);
      // setIsFlipped((prev) => !prev);
   }

   const cardReviewStateOnChange = (event) =>{
      props.onCardReviewStatusChange(event);
      setMastered(event.target.value);
   }


   return (

      <div className="cardElement mybox">
         {props.ActiveCardid!==props.flashcardDetails.id && (

               <div id={"flip_"+props.flashcardDetails.id} onClick={FlipThisCard} className="box card-header">
                  {props.flashcardDetails.Word}
               </div>

         )}

         {props.ActiveCardid===props.flashcardDetails.id && (

         <div className="card-body box style0">

            <section>

               <div className="card-createdDate">

                  <div className="row">

                     <div className="col-6 align_center_user">
                        WordViewCount: {props.cardViewScore}
                     </div>

                     <div className="col-6 align_center_user">
                        {new Date(props.flashcardDetails.TimeStamp).toDateString()}
                     </div>

                  </div>

               </div>

               <div className="card-meaning">
               {props.flashcardDetails.Meaning}
               </div>

               <div className="card-sentance">
               {props.flashcardDetails.Sentence}
               </div>

               <div className="card-action_bar">
                  <button className="card_btn_delete" type="button" value="delete" id={"delete_"+props.flashcardDetails.id} onClick={props.DeleteCardHandler}>Delete</button>
                  <select className="card_select_category" id={"select_"+props.flashcardDetails.id} onChange={cardReviewStateOnChange} value={isMastered}>
                     <option value="Mastered">Mastered</option>
                     <option value="Reviewing">Reviewing</option>
                  </select>
                  <button className="card_btn_reset" type="button" value="ResetCard" onClick={FlipThisCard}>ResetCard</button>
               </div>

               
            </section> 
         </div>

         )} 

      </div>
   );
   
}
export default FlashCard;