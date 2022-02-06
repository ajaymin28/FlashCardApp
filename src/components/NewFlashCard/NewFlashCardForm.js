import React, { useState } from "react";
import "./NewFlashCardForm.css";

const NewFlashCardForm = (props) => {

  const [userInput, setUserInput] = useState({
    enteredWord: "",
    enteredMeaning: "",
    enteredSampleSentence: "",
  });


  const wordchangeHandler = (event) =>{
    setUserInput((prevState) => {
        return {
          ...prevState,
          enteredWord: event.target.value,
        };
    });
  }

  const wordMeaningchangeHandler = (event) =>{
    setUserInput((prevState) => {
        return {
          ...prevState,
          enteredMeaning: event.target.value,
        };
    });
  }

  const wordSampleSentencechangeHandler = (event) =>{
    setUserInput((prevState) => {
        return {
          ...prevState,
          enteredSampleSentence: event.target.value,
        };
    });
  }

  const AddNewCardHandler = (event) => {

    event.preventDefault();

    // if(!userInput.enteredSampleSentence.toLowerCase().includes(userInput.enteredWord.toLowerCase())){
    //   alert("Please use the word in the sentence.")
    // }else{

      var CardData = {
          id: Math.random().toString(),
          Word: userInput.enteredWord,
          Meaning: userInput.enteredMeaning,
          Sentence: userInput.enteredSampleSentence,
      };

      props.onSaveFlashCardData(CardData);

      setUserInput({
          enteredWord: "",
          enteredMeaning: "",
          enteredSampleSentence: "",
      });

      document.getElementById("new_word").focus();
      document.getElementById("addnewcardform").reset();

    // }

  }

  return (
    <div class="container">

      <form className="newcardForm" id="addnewcardform">

        <section>
          <div className="row">
              <div className="col-12 col-12-small">
                <label>Word</label>
                <input autoFocus="true" type="text" id="new_word" value={userInput.enteredWord} onChange={wordchangeHandler}/>
              </div>
          </div>
          <div className="row">
              <div className="col-12 col-12-small">
                    <label>Word Meaning</label>
                    <input type="text" id="new_word_meaning" value={userInput.enteredMeaning}  onChange={wordMeaningchangeHandler}/>
              </div>
          </div>
          <div className="row">
              <div className="col-12 col-12-small">
                      <label>Sample Sentence</label>
                      <textarea id="new_word_sample_sentence" value={userInput.enteredSampleSentence}  onChange={wordSampleSentencechangeHandler}/>
              </div>
          </div>
          <div className="row">
              <div className="col-12 col-12-small">
                      <button type="button" className="form_btn_submit" onClick={AddNewCardHandler}>Add New Word</button>
                      <button type="button" className="form_btn_cancel" onClick={props.onCancel}>Cancel</button>
              </div>
          </div>
        </section>          

              
      </form>
    </div>
  );


};

export default NewFlashCardForm;