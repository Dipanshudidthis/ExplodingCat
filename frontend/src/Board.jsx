import React, {useState, useEffect} from 'react'
import "./Board.css"
import Navbar from './components/Navbar';
import {useDispatch, useSelector} from "react-redux"
import { updateScore, fetchHighscore } from './redux/slices/userSlice';
import Highscore from './components/Highscore';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import Cat from "./assets/catcard.png";
import Exp from "./assets/defuse.png";
import Def from "./assets/explode.png";
import Shu from "./assets/shuffle.png";
import maincard from "./assets/maincard.png";




function Board() {
    const [deck, setDeck] = useState([])
    const [diffuseCardCount, setDiffuseCardCount] = useState(0)
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [explodeAction, setExplodeAction] = useState(false);
    const [currentCard, setCurrentCard] = useState(null)
    const [cardIsShowing, setCardIsShowing] = useState(false);

    const dispatch = useDispatch();

    const highscore = useSelector(state => state.user.highscores)

    //Fill the deck with 5 random cards !!!!Need to change 1 defuse card to shuffle cards
    // const initializeDeck = () => {
    //     const tempDeck = [];
    //     function Card(Cname, Ctitle) {
    //         this.cardName = Cname;
    //         this.cardTitle = Ctitle;
    //       }

    //       const cardOne = new Card('Cat card', 'what title');
    //       const cardTwo = new Card('Defuse card', 'second card title');
    //       const cardThree = new Card('Shuffle card', 'third card title');
    //       const cardFour = new Card('Exploding kitten card', 'forth card title');

    //       function getRandomInt(min, max) {
    //         return Math.floor(Math.random() * (max - min + 1) + min);
    //     }
    //       for(let i=0; i<5; i++){
    //         let response = getRandomInt(1, 4);
    //         if(response == 1){
    //             tempDeck.push(cardOne)
    //         }
    //         else if(response == 2){
    //             tempDeck.push(cardTwo)
    //         }
    //         else if(response == 3){
    //             tempDeck.push(cardThree)
    //         }
    //         else{
    //             tempDeck.push(cardFour)
    //         }
    //       }
    //       return tempDeck;
    // }

    const initializeDeck = () => {
        const cards = [
          { cardName: 'Cat card'},
          { cardName: 'Defuse card'},
          { cardName: 'Shuffle card'},
          { cardName: 'Exploding kitten card'},
        ];
        const tempDeck = [];
      
        const getRandomInt = (min, max) => {
          return Math.floor(Math.random() * (max - min + 1) + min);
        }
      
        for (let i = 0; i < 5; i++) {
          tempDeck.push(cards[getRandomInt(0, cards.length - 1)]);
        }
      
        return tempDeck;
      }

    const restartGame = () => {
        const tempDeck = initializeDeck();
        setDeck(tempDeck);
        setDiffuseCardCount(0);
        dispatch(fetchHighscore())
        setGameOver(false)
        setGameWon(false)
    }

    const handleExplodingKitten = () => {
            const tempDeck = [...deck];
            tempDeck.pop();

            if(deck.length == 1){
                dispatch(updateScore())
                setGameWon(true)
            }
            else{
                setDiffuseCardCount(prev => prev - 1);
                setDeck(tempDeck)
                setExplodeAction(false)
            }
    }

    //Pop the last card ->  check what it is -> take appropriate action
    const handleCardShow = () => {
        const tempDeck = [...deck];
        const currCard = tempDeck[tempDeck.length-1];
        setCurrentCard(currCard)
        setCardIsShowing(true)
        setTimeout(() => {
            if(tempDeck.length == 1 && currCard.cardName != "Shuffle card" && currCard.cardName != "Exploding kitten card"){
                setGameWon(true)
                dispatch(updateScore())
            }

            if(currCard.cardName == "Cat card"){
                //remove card from deck
                tempDeck.pop();
                setDeck(tempDeck);
            }
            else if(currCard.cardName == "Defuse card"){
                setDiffuseCardCount(prev => prev + 1)
                tempDeck.pop();
                setDeck(tempDeck);
            }
            else if(currCard.cardName == "Shuffle card"){
                restartGame() //Restart Game 
            }
            else if(currCard.cardName == "Exploding kitten card"){ //exploding kitten card
                if(diffuseCardCount > 0 ){ //if player has any diffuse cards
                    //Game over
                    setExplodeAction(true);
                }
                else{
                    setGameOver(true)
                }
            }
            setCurrentCard(null); // set currentCard to null after 2.5 seconds
            setCardIsShowing(false)
          }, 2500)
    }

      
    useEffect( () => {
        const tempDeck = initializeDeck();
        setDeck(tempDeck);
    }, [])

    console.log(deck)
  return (
    <>
    <Navbar/>
    {
        gameWon ? (
            <div className='loser'>
                <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="140"
                            image={Cat}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                           You Won <br />👑🙌 <br /><Button onClick={ restartGame } style={{color:"black", background:"orange"}}>Restart</Button>
                            </Typography>
                        </CardContent>
                        </Card>
            </div>
        ) : (
            // display: flex;
            // justify-content: center;
            // padding-top: 13px;
        gameOver ? (
            <div className='loser'>
                <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="140"
                            image={Def}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                           You Lost <br />💣💥 <br /><Button onClick={ restartGame } style={{color:"black", background:"orange"}}>Restart</Button>
                            </Typography>
                        </CardContent>
                        </Card>
            </div>
        ) : (
        <div className='board' >
        
        <div className="container">
            <div className='card-cont' >
                {
                deck && deck.map((card, ind) => (
                    <Card sx={{ maxWidth: 345 }} key={ind}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="140"
                            image={maincard}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            card {ind}
                            </Typography>
                        </CardContent>
                        </Card>
                    // <div key={ind} className={`card card-${ind+1}`} >card {ind} </div>
                ))
                }
            </div>

            {
                currentCard && (
                    <div className='card active-card'> 
                    {
                   <Card sx={{ maxWidth: 345 }}>
                        {/* <CardMedia
                            component="img"
                            alt={currentCard.cardName.substr(0,3)}
                            height="140"
                            image={currentCard.cardName.substr(0,3)}
                        /> */}
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {console.log(currentCard.cardName.substr(0,3))}
                                {currentCard.cardName}
                            </Typography>
                        </CardContent>
                        </Card>

                // currentCard.cardName
                    }
                    </div>
                )
            }

            { !cardIsShowing && <button className='show-btn' onClick={handleCardShow} >show card</button>} 
            {
                explodeAction && <button onClick={handleExplodingKitten} >useDiffuse</button>
            }
            <h2>Diffuse Cards Available - {diffuseCardCount}</h2>
        </div>

                <Highscore highscore={highscore} />

            </div>
        )
      )
    }

    </>
  )
}

export default Board