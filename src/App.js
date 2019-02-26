import React, { Component } from 'react';
import MatchCard from './components/MatchCard';
import Wrapper from './components/Wrapper';
import Nav from './components/Nav';
import Title from './components/Title';
import matches from './matchcards.json';
import './App.css';

let correctGuesses = 0;
let bestScore = 0;
let clickMessage = "Click on the pic to earn points, but dont click the same Sith twice!";

class App extends Component {
  state = {
    matches,
    correctGuesses,
    bestScore,
    clickMessage
  };

  setClicked = id => {
    const matches = this.state.matches;
    const clickedMatch = matches.filter(match => match.id === id);

    if (clickedMatch[0].clicked) {
      console.log("Correct Guesses: " + correctGuesses);
      console.log("Best Score: " + bestScore);

      correctGuesses = 0;
      clickMessage= "You already clicked on that one...learn to control your anger!"

      for (let i = 0; i < matches.length; i++) {
        matches[i].clicked = false;
      }

      this.setState({ clickMessage });
      this.setState({ correctGuesses });
      this.setState({ matches });

    } else if (correctGuesses < 11) {
      clickedMatch[0].clicked = true;
      correctGuesses++;

      clickMessage = "You have found you Dark Lord.  Now learn from a new one!";

      if (correctGuesses > bestScore) {
        bestScore = correctGuesses;
        this.setState({ bestScore });
      }
      matches.sort(function (a, b) { return 0.5 - Math.random() });

      this.setState({ matches });
      this.setState({ correctGuesses });
      this.setState({ clickMessage });

    } else {

      clickedMatch[0] = true;
      correctGuesses = 0;

      clickMessage = "You've dominated all of the Dark Lords.  You are a master Sith!";
      bestScore = 12;
      this.setState({ bestScore });

      for (let i = 0; i < matches.length; i++) {
        matches[i].clicked = false;
      }

      matches.sort(function (a,b) { return 0.5 - Math.random() });

      this.setState({ matches });
      this.setState({ correctGuesses });
      this.setState({ clickMessage});
    }
  };
  
  render() {
    return (
        <Wrapper>
            <Nav
                message={this.state.clickMessage}
                curScore={this.state.correctGuesses}
                topScore={this.state.bestScore}
            />
            <Title>Your Dark Lords</Title>
            {this.state.matches.map(match => (
                <MatchCard
                    setClicked={this.setClicked}
                    id={match.id}
                    key={match.id}
                    image={match.image}
                />
            ))}
        </Wrapper>
    );
}
}

export default App;