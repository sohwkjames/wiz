import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';

// ModifiablePlayerTable
//   Add player bar
//   PlayerList
//      PlayerRow


// Things to compute:
// - Maintain an array of player objects
// - maintain an array of question objects

class PlayerRow extends React.Component{
  render(){
    var name = this.props.name
    var score = this.props.score
    return (<li>Player: {name}, Score: {score}</li>  )
  }
}

class PlayerList extends React.Component{
    render() {
    const players = this.props.players
    const listitems = players.map((player) =>
    <PlayerRow key={player.id} name={player.name} score={player.score}/>
  )
    return (
      <div>
      <p>Players:</p>
      <ul>{listitems}</ul>
      </div>
    )
  }
}

class ModifiablePlayerTable extends React.Component{
  // This is the top most object, and will hold some state.
  render() {

  }
}

function addPlayer(data, player){
  data.push(player);
}

let PLAYER_DATA = [
  {id: "1", name: "adam", score: "2"},
  {id: "2", name: "bob", score: "3"},
  {id: "3", name: "celia", score: "11"},
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="playerArea"> <PlayerList players={PLAYER_DATA}/> </div>
        <div className="questionArea">Game questions go here</div>
      </header>

        
      
    </div>
  );
}

export default App;
