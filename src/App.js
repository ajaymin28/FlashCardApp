import React, { useState } from "react";
import './assets/css/main.css';
import './assets/css/user-style.css';
import './App.css';
import NewFlashCard  from './components/NewFlashCard/NewFlashCard';
import FlashCardHolder from './components/FlashCard/FlashCardHolder';
import DashBoard from "./components/DashBoard/Dashboard";
import Filters from "./components/Filters/Filters";


const DUMMY_CARDS = [
  {
    id: "id1",
    Word: "cede",
    Meaning: "give up control",
    Sentence: "parents should cede control over their kid's eduction path",
    TimeStamp: "12/5/2021",
    Mastered: false,
  },
];

let InitDone = false;


const App = () => {

  const [Cards, setCards] = useState(DUMMY_CARDS);
  const [cardsScore, setCardScores] = useState({"Mastered": 0, "Reviewing":0});
  const [cardViewScore, setCardViewScores] = useState(0);

  const getCardsfromDB = (queries) =>{

    // console.log(queries);

    try{

      fetch('http://localhost:8080/getwords',{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body:JSON.stringify({
            "filters": queries
          }),
        }).then(response => response.json()).then((data) => {
          if(data.error===false){
            setCards(data.flashCardData);
            InitDone = true;
          }else{
            alert("Error "+ data.error_msg);
          }
          InitDone = true;
      });

    }catch(e){
      console.log(e);
      InitDone = true;
    }

    

  };

  const addCardHandler = (CardItem) => {

  
    fetch('http://localhost:8080/addWord', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "Word": CardItem.Word,
        "Meaning": CardItem.Meaning,
        "Sentence": CardItem.Sentence,
      })
    }).then(response => response.json()).then((data) => {
      if(data.error===false){
        setCards((prevState) => {
          return [data.addedCard, ...prevState];
        });
      }else{
        alert("Error "+ data.error_msg);
      }
    });
    
  };

  const handleCardReviewChangeDb = (event) =>{
    var elementID = event.target.id.split("_")[1];
    var CardReviewStatus = event.target.value;
    // TODO

    fetch('http://localhost:8080/updatewordstatus', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "wordid":elementID,
        "updateReviewStatus": CardReviewStatus
      })
    }).then(response => response.json()).then((data) => {
       console.log(data);
       getCardScoreUpdate();
    });

  };

  const getCardScoreUpdate  = () =>{

    fetch('http://localhost:8080/getcardScores',{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then(response => response.json()).then((data) => {
        if(data.error===false){
          setCardScores({
            "Mastered": data.mastered,
            "Reviewing": data.reviewing
          });
        }else{
          alert("Error "+ data.error_msg);
        }
    });

  };

  const handleCardDeleteDb = (event) =>{
    var elementID = event.target.id.split("_")[1];

    if(elementID!=null){

      fetch('http://localhost:8080/deleteword', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "wordid":elementID,
        })
      }).then(response => response.json()).then((data) => {
        var deletedid = data.deletedid;

        var updatedCards = [];
        // TODO add filtering method here.
        Cards.map((element) =>{
          if(element.id!==deletedid){
            updatedCards.push(element);
          }
        });

        setCards(updatedCards);

        // setCards((prevState) => {
        //   return [updatedCards, ...prevState];
        // });

      });

    }

  };

  const handleCardFlipDb = (event) =>{

    var elementID = event.target.id.split("_")[1];
    
    fetch('http://localhost:8080/updatewordviewcount', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "wordid":elementID,
        })
      }).then(response => response.json()).then((data) => {
        setCardViewScores(data.wordviewcount);
      });

  };

  const handleFilterChange = (filters) =>{
    getCardsfromDB(filters);
  };

  if(!InitDone){
    var FilterProps = {
      "CardStatus": "Reviewing",
      "FilterByCount": -1
    }
    getCardsfromDB(FilterProps);
    getCardScoreUpdate();
  }

  return (
    <div>

      <nav id="nav">
        <p>Developed by @ajaymin28 (Jaimin Bhoi)</p>
      </nav>

      <section class="box style0">
        <div class="container">
            <div class="row">
              <div class="col-4 col-4-large col-12-medium">
                <NewFlashCard onAdd={addCardHandler}/>
              </div>
              <div class="col-4 col-4-large col-12-medium">
                <Filters onFilterChange={handleFilterChange} onFilterChangeViewCount={handleFilterChange}/>
              </div>
              <div class="col-4 col-4-large col-12-medium">
                <DashBoard MasteredCards={cardsScore.Mastered} cardViewScore={cardViewScore} ReviewingCards={cardsScore.Reviewing}/>
              </div>
            </div>
        </div>
      </section>

      <section class="style2">
        
        <div class="container">
          <div class="row">
            <div class="col-12 col-12-large col-12-medium">
            <FlashCardHolder flashcardslist={Cards} 
                              cardViewScore={cardViewScore}
                              onCardDelete={handleCardDeleteDb} 
                              onCardReviewChangeDB={handleCardReviewChangeDb}
                              onCardFlipHandleDB={handleCardFlipDb} />
              
            </div>
          </div>
        </div>

      </section>

      {/* <article id="top" class="wrapper style0">

				<div class="container">

					<div class="row">

              <div class="col-12 col-12-large col-12-medium">
              
              </div>
						
					</div>
        </div>
			</article> */}

      <script src="assets/js/jquery.min.js"></script>
			<script src="assets/js/jquery.scrolly.min.js"></script>
			<script src="assets/js/browser.min.js"></script>
			<script src="assets/js/breakpoints.min.js"></script>
			<script src="assets/js/util.js"></script>
			<script src="assets/js/main.js"></script>


      
      
    </div>
  );
}

export default App;
