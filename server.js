const express = require('express');
const app = express();
const cors = require('cors');
const loki = require('lokijs');
const { v1: uuidv1,v4: uuidv4,} = require('uuid');


var flashcards = null;

var loki_db = new loki('FlashCardsData.db',{
	autoload: true,
	autoloadCallback : databaseInitialize,
	autosave: true, 
	autosaveInterval: 4000 // save every four seconds for our example
});

function databaseInitialize() {
    flashcards = loki_db.getCollection("FlashCards");
    if (flashcards === null) {
        flashcards = loki_db.addCollection("entries");
    }
}


app.use(express.json());
app.use(cors());



app.post('/updatewordviewcount', (req,res) => {

    if(req.body.wordid==""){
        res.send({"error":true, "error_msg": "Please add wordid"});
    }

    var wordid = req.body.wordid;
    var cardToUpdate = flashcards.find({'id': wordid});
    var cardViewScore = 0;

    try{
        if(cardToUpdate[0].wordviewcount==null){
            cardToUpdate[0].wordviewcount =1 
        }else{
            cardToUpdate[0].wordviewcount +=1 
        }
        flashcards.update(cardToUpdate);
        cardViewScore = cardToUpdate[0].wordviewcount;
    }catch(e){
        console.log(e);
    }

    res.send({"error":false, "wordviewcount": cardViewScore});
});

app.post('/updatewordstatus', (req,res) => {

    if(req.body.wordid==""){
        res.send({"error":true, "error_msg": "Please add wordid"});
    }

    if(req.body.updateReviewStatus==""){
        res.send({"error":true, "error_msg": "Please add updateReviewStatus"});
    }

    var wordid = req.body.wordid;
    var updatedReviewStatus = req.body.updateReviewStatus;


    var cardToUpdate = flashcards.find({'id': wordid});

    if(updatedReviewStatus=="Mastered"){
        cardToUpdate[0].Mastered = true;
    }else{
        cardToUpdate[0].Mastered = false;
    }

    flashcards.update(cardToUpdate);
    res.send({"error":false, "msg": "ReviewStatus Updated"});


});

app.post('/addWord',(req,res) => {

    // console.log(req.body);

    if(req.body.Word==""){
        res.send({"error":true, "error_msg": "Please add word"});
    }

    if(req.body.Meaning==""){
        res.send({"error":true, "error_msg": "Please add word meaning"});
    }

    if(req.body.Sentence==""){
        res.send({"error":true, "error_msg": "Please add sentence that uses a word"});
    }

    // if(!req.body.Sentence.toLowerCase().includes(req.body.Word.toLowerCase())){
    //     res.send({"error":true, "error_msg": "Added sentence is not using the word "+ req.body.Word});
    // }

    var Card = {
        id: uuidv4(),
        Word: req.body.Word,
        Meaning: req.body.Meaning,
        Sentence: req.body.Sentence,
        TimeStamp: Date.now(),
        Mastered: false,
        wordviewcount:0,
    }

    flashcards.insert(Card);
    res.send({"addWordStatus":true, "addedCard": Card, "error": false});

});

app.post('/getwords',(req,res) => {
	
	/*console.log(flashcards);
	flashCardData = flashcards.chain().data();

	for(var v in flashCardData){
		if (flashCardData.hasOwnProperty(v)) {
			if(flashCardData[v]["wordviewcount"]===-1){
				flashCardData[v]["wordviewcount"] = 0;
				flashcards.update(flashCardData[v]);
				console.log(flashCardData[v]);
			}
		}
	}*/
	
	

    var results;
    var filters  = {};

    // console.log(req.body.filters);

    if(req.body.filters.CardStatus!=null){
        if(req.body.filters.CardStatus=="Reviewing"){
            filters['Mastered'] = false;
        }else{
            filters['Mastered'] = true;
        }
    }

    if(req.body.filters.FilterByCount!==undefined){
        filters["wordviewcount"] = { $lt: req.body.filters.FilterByCount} ;
    }

    console.log(filters);

    results = flashcards.find(filters);
    res.send({"flashCardData": results, "error": false});

    // flashCardData = flashcards.chain().data();
    // res.send({"flashCardData": flashCardData, "error": false});
    // if(req.body.typeofwords==""){
    //     flashCardData = flashcards.chain().data();
    //     res.send({"flashCardData": flashCardData, "error": false});
    // }else{

    //     if(req.body.typeofwords=="Reviewing"){
    //         results = flashcards.find({'Mastered': false});
    //     }else{
    //         results = flashcards.find({'Mastered': true});
    //     }
    //     res.send({"flashCardData": results, "error": false});
    // }

  
});

// 
app.get('/getcardScores',(req,res) => {
    // flashCardData = flashcards.chain().data();
    var mastered_results_length = flashcards.find({'Mastered': true}).length;
    var reviewing_results_length = flashcards.find({'Mastered': false}).length;
    res.send({"mastered": mastered_results_length,"reviewing":reviewing_results_length, "error": false});
});

app.post('/deleteword',(req,res) => {

    if(req.body.wordid==""){
        res.send({"error":true, "error_msg": "Please add wordid"});
    }


    var foundCard = flashcards.find({id: req.body.wordid});

    if(foundCard[0].id==req.body.wordid){
        // console.log("deleting "+ foundCard[0].id);
        flashcards.remove(foundCard);
        res.send({ "error": false, "msg": "deleted", "deletedid":foundCard[0].id});
    }else{
        res.send({ "error": true});
    }

});





app.listen(8080, () => console.log('Server is running on Port : 8080'));