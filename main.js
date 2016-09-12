import React from 'react';
import ReactDOM from 'react-dom';

let correctMoves = new Array;
let playerMoves = new Array;
let colors = ["#40B240", "#E63340", "#FFF057", "#1775FF"];

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      playing: true,
      counter: 0
    };
    this.toggleGame = this.toggleGame.bind(this);
    this.buttonsClick = this.buttonsClick.bind(this);
  }

  toggleGame() {
    this.setState({
      playing: !this.state.playing
    });
    if(this.state.playing) {
      this.playGame();
      document.getElementById("button").style.backgroundColor = "#093";
    } else {
      correctMoves = [];
      playerMoves = [];
      this.setState({
        counter: 0
      });
      for(let i=1; i<=4; i++) {
        document.getElementById(`box${i}`).style.cursor = "default";
        document.getElementById(`box${i}`).removeEventListener("click", this.buttonsClick);
      }
      document.getElementById("button").style.backgroundColor = "crimson";
    }
  }

  buttonsClick() {
    let clicked = parseInt(event.target.id.match(/\d/g));
    playerMoves.push(clicked);
    document.getElementById(`box${clicked}`).style.backgroundColor = "grey";
    setTimeout(function() {
      document.getElementById(`box${clicked}`).style.backgroundColor = colors[clicked-1];
    }, 500);
    if(playerMoves.length == correctMoves.length) {
      if(JSON.stringify(playerMoves) == JSON.stringify(correctMoves)) {
        correctMoves.push(Math.floor((Math.random() * 4) + 1));
        for(let i=0; i<correctMoves.length; i++) {
          setTimeout(function() {
            document.getElementById(`box${correctMoves[i]}`).style.backgroundColor = "grey";
          }, 1000*i+1000);
          setTimeout(function() {
            document.getElementById(`box${correctMoves[i]}`).style.backgroundColor = colors[correctMoves[i]-1];
          }, 1000*i+1500);
        }
        playerMoves = [];
        this.setState({
          counter: this.state.counter + 1
        });
      } else {
        this.setState({
          counter: 0
        });
        setTimeout(function() {
          playerMoves = [];
          correctMoves = [];
        }, 1500);
      }
    }
  }

  playGame() {
    for(let i=1; i<=4; i++) {
      document.getElementById(`box${i}`).style.cursor = "pointer";
      document.getElementById(`box${i}`).addEventListener("click", this.buttonsClick);
    }
    correctMoves.push(Math.floor((Math.random() * 4) + 1));
    setTimeout(function() {
      document.getElementById(`box${correctMoves[0]}`).style.backgroundColor = "grey";
    }, 1000);
    setTimeout(function() {
      document.getElementById(`box${correctMoves[0]}`).style.backgroundColor = colors[correctMoves[0]-1];
    }, 1500);
  }

  render() {
    return (
      <div>
        <div id="container">
          <div id="game">
            <div id="box1" />
            <div id="box2" />
            <div id="box3" />
            <div id="box4" />
            <div id="display">
              <h1>Simon<span>®</span></h1>
              <div id="panel">{this.state.counter}</div>
              <div id="button" onClick={this.toggleGame} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
